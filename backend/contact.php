<?php

declare(strict_types=1);

#============================================================#
# DB関係
#============================================================#
define('DBSERVER', 'localhost');
define('DBUSER', 'xbaf8039_kmscc');
define('DBPASSWORD', '9mK0s5AZ08Y3'); #2025/07/28～
define('DBNAME', 'xbaf8039_km2507scc');
#============================================================#
# DBコネクト PDO                                             #
#============================================================#
function db_connect()
{
  try {
    $db = new PDO(
      'mysql:host=' . DBSERVER . ';dbname=' . DBNAME . ';charset=utf8mb4',
      DBUSER,
      DBPASSWORD,
      array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4")
    );
  } catch (PDOException $e) {
    throw $e;
  }
  return $db;
}
#============================================================#
# DBコネクト解除 PDO
#============================================================#
function db_disconnect($db)
{
  #DB切断
  unset($db);
}

/*=======================================
* お問い合せフォーム
* URL: /backend/contact.php
* Last updated: 2026-03-26
* ======================================= */

// ------------------------------
// CORS（開発/LAN も許可しつつ、本番は固定）
// ※ Origin は「スキーム + ドメイン + ポート」まで（パスは含まれない）
// ------------------------------
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allow_origin = false;

// 本番/デモ（完全一致）
$fixed_origins = [
  'https://shirakawa-chuo-cc.com',
];

// 完全一致
if ($origin !== '' && in_array($origin, $fixed_origins, true)) {
  $allow_origin = true;
}

// 開発（localhost / LAN）をゆるく許可
if (
  $origin !== '' &&
  (
    preg_match('#^http://localhost:\d+$#', $origin) === 1 ||
    preg_match('#^http://127\.0\.0\.1:\d+$#', $origin) === 1 ||
    preg_match('#^http://192\.168\.\d+\.\d+:\d+$#', $origin) === 1
  )
) {
  $allow_origin = true;
}

if ($allow_origin) {
  header('Access-Control-Allow-Origin: ' . $origin);
  header('Vary: Origin');
  header('Access-Control-Allow-Methods: POST, OPTIONS');
  header('Access-Control-Allow-Headers: Content-Type');
}

header('Content-Type: application/json; charset=UTF-8');

// JSONレスポンス統一
function json_exit(int $code, array $payload): void
{
  http_response_code($code);
  echo json_encode($payload, JSON_UNESCAPED_UNICODE);
  exit;
}

// preflight
if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
  json_exit(204, ['success' => true]);
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
  json_exit(405, ['success' => false, 'error' => '無効なリクエストです。']);
}

function normalize_nullable_string(string $value): ?string
{
  $trimmed = trim($value);
  return $trimmed === '' ? null : $trimmed;
}

function bind_nullable_string(PDOStatement $statement, string $parameter, ?string $value): void
{
  if ($value === null) {
    $statement->bindValue($parameter, null, PDO::PARAM_NULL);
    return;
  }

  $statement->bindValue($parameter, $value, PDO::PARAM_STR);
}

function log_mail_status_update_failure(
  int $application_id,
  int $user_mail_status,
  int $admin_mail_status,
  string $message
): void {
  error_log(
    sprintf(
      '[contact.php] process=mail_status_update application_id=%d user_mail_status=%d admin_mail_status=%d error=%s',
      $application_id,
      $user_mail_status,
      $admin_mail_status,
      $message
    )
  );
}

function build_mail_body(array $mail_data): string
{
  $mail_body  = "講座申し込みフォームより\n";
  $mail_body .= "--------------------\n";
  $mail_body .= "【講座タイトル】\n{$mail_data['course_title']}\n\n";

  if ($mail_data['course_name'] !== '') {
    $mail_body .= "【講座名】\n{$mail_data['course_name']}\n\n";
  }

  $mail_body .= "--------------------\n";
  $mail_body .= "■お名前\n{$mail_data['name']} 様\n\n";
  $mail_body .= "■ふりがな\n{$mail_data['furigana']}\n\n";

  if ($mail_data['age'] !== '') {
    $mail_body .= "◎年齢\n{$mail_data['age']}\n\n";
  }

  if ($mail_data['grade'] !== '') {
    $mail_body .= "◎学年\n{$mail_data['grade']}\n\n";
  }

  $mail_body .= "◎性別\n{$mail_data['gender']}\n\n";

  $address = "〒{$mail_data['post_number']} {$mail_data['city']} {$mail_data['street_address']}";
  if ($mail_data['building_name'] !== '') {
    $address .= " {$mail_data['building_name']}";
  }

  $mail_body .= "◎住所\n{$address}\n\n";

  if ($mail_data['school_district'] !== '') {
    $mail_body .= "◎校区\n{$mail_data['school_district']}\n\n";
  }

  $mail_body .= "◎電話番号\n{$mail_data['phone']}\n";
  $mail_body .= "--------------------\n";

  if ($mail_data['email'] !== '') {
    $mail_body .= "◎メールアドレス\n{$mail_data['email']}\n";
    $mail_body .= "--------------------\n";
  }

  if ($mail_data['notes'] !== '') {
    $mail_body .= "【備考】\n{$mail_data['notes']}\n\n";
  }

  $mail_body .= "--------------------\n";
  $mail_body .= $mail_data['send_date'] . "\n";

  return str_replace(["\r\n", "\r"], "\n", $mail_body);
}

function send_japanese_mail(
  string $to_email,
  string $to_name,
  string $subject,
  string $body,
  string $from_name,
  string $from_email,
  ?string $reply_to,
  ?string $cc_email = null
): array {
  $warning_message = null;
  $org_encoding = mb_internal_encoding();
  $previous_handler = set_error_handler(static function (int $severity, string $message) use (&$warning_message): bool {
    $warning_message = $message;
    return true;
  });

  mb_language('uni');
  mb_internal_encoding('UTF-8');

  $headers  = 'From: "' . mb_encode_mimeheader($from_name, 'ISO-2022-JP') . '" <' . $from_email . ">\r\n";

  if ($reply_to !== null && $reply_to !== '') {
    $headers .= 'Reply-To: ' . $reply_to . "\r\n";
  }

  if ($cc_email !== null && $cc_email !== '') {
    $headers .= 'Cc: ' . $cc_email . "\r\n";
  }

  $headers .= "MIME-Version: 1.0\r\n";
  $headers .= "Content-Type: text/plain; charset=ISO-2022-JP\r\n";
  $headers .= "Content-Transfer-Encoding: 7bit\r\n";

  $send_target = $to_email;
  if ($to_name !== '') {
    $send_target = mb_encode_mimeheader($to_name, 'ISO-2022-JP') . ' <' . $to_email . '>';
  }

  try {
    $result = mb_send_mail($send_target, $subject, $body, $headers, '-f' . $from_email);
  } finally {
    mb_internal_encoding($org_encoding);
    restore_error_handler();
  }

  if ($result) {
    return [
      'success' => true,
      'error' => null,
    ];
  }

  return [
    'success' => false,
    'error' => $warning_message ?? 'mb_send_mail returned false.',
  ];
}

$course_title_map = [
  '1' => 'カルチャー講座',
  '2' => '総合講座',
];

$grade_map = [
  'elementary-1' => '小学１年生',
  'elementary-2' => '小学２年生',
  'elementary-3' => '小学３年生',
  'elementary-4' => '小学４年生',
  'elementary-5' => '小学５年生',
  'elementary-6' => '小学６年生',
  'junior-1'     => '中学１年生',
  'junior-2'     => '中学２年生',
  'junior-3'     => '中学３年生',
  'none'         => '該当なし',
];

$gender_map = [
  'male' => '男性',
  'female' => '女性',
];

$course_title_code = trim($_POST['courseTitle'] ?? '');
$course_name = trim($_POST['courseName'] ?? '');
$name_sei = trim($_POST['nameSei'] ?? '');
$name_mei = trim($_POST['nameMei'] ?? '');
$furigana_sei = trim($_POST['furiganaSei'] ?? '');
$furigana_mei = trim($_POST['furiganaMei'] ?? '');
$age = trim($_POST['age'] ?? '');
$grade_code = trim($_POST['grade'] ?? '');
$gender_code = trim($_POST['gender'] ?? '');
$post_number = trim($_POST['postNumber'] ?? '');
$city = trim($_POST['city'] ?? '');
$street_address = trim($_POST['streetAddress'] ?? '');
$building_name = trim($_POST['buildingName'] ?? '');
$school_district = trim($_POST['schoolDistrict'] ?? '');
$phone = trim($_POST['phone'] ?? '');
$email = trim($_POST['email'] ?? '');
$notes = trim($_POST['notes'] ?? '');

$validation_fields = [];

if ($course_title_code === '' || !isset($course_title_map[$course_title_code])) {
  $validation_fields['courseTitle'] = '講座タイトル区分を正しく選択してください。';
}

if ($course_name === '') {
  $validation_fields['courseName'] = '講座名は必須です。';
}

if ($name_sei === '') {
  $validation_fields['nameSei'] = '姓は必須です。';
}

if ($name_mei === '') {
  $validation_fields['nameMei'] = '名は必須です。';
}

if ($furigana_sei === '') {
  $validation_fields['furiganaSei'] = 'ふりがな（姓）は必須です。';
}

if ($furigana_mei === '') {
  $validation_fields['furiganaMei'] = 'ふりがな（名）は必須です。';
}

if ($age === '') {
  $validation_fields['age'] = '年齢は必須です。';
} elseif (preg_match('/^\d+$/', $age) !== 1 || (int)$age > 255) {
  $validation_fields['age'] = '年齢は半角数字で入力してください。';
}

if ($grade_code !== '' && !isset($grade_map[$grade_code])) {
  $validation_fields['grade'] = '学年の値が不正です。';
}

if ($gender_code === '' || !isset($gender_map[$gender_code])) {
  $validation_fields['gender'] = '性別を正しく選択してください。';
}

if ($post_number === '') {
  $validation_fields['postNumber'] = '郵便番号は必須です。';
} elseif (preg_match('/^\d{7}$/', $post_number) !== 1) {
  $validation_fields['postNumber'] = '郵便番号は7桁の数字で入力してください。';
}

if ($city === '') {
  $validation_fields['city'] = '市区町村は必須です。';
}

if ($street_address === '') {
  $validation_fields['streetAddress'] = '番地は必須です。';
}

if ($phone === '') {
  $validation_fields['phone'] = '電話番号は必須です。';
} elseif (preg_match('/^\d+$/', $phone) !== 1) {
  $validation_fields['phone'] = '電話番号はハイフンなしの数字で入力してください。';
}

if ($email === '') {
  $validation_fields['email'] = 'メールアドレスは必須です。';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  $validation_fields['email'] = 'メールアドレスの形式が不正です。';
}

foreach (
  [
    'nameSei' => $name_sei,
    'nameMei' => $name_mei,
    'email' => $email,
  ] as $field_name => $value
) {
  if ($value !== '' && preg_match("/[\r\n]/", $value) === 1) {
    $validation_fields[$field_name] = '入力値が不正です。';
  }
}

if ($validation_fields !== []) {
  json_exit(400, [
    'success' => false,
    'error' => '入力内容に不備があります。',
    'fields' => $validation_fields,
  ]);
}

$course_title = $course_title_map[$course_title_code];
$grade = $grade_code !== '' ? $grade_map[$grade_code] : '';
$gender = $gender_map[$gender_code];
$name = $name_sei . ' ' . $name_mei;
$furigana = $furigana_sei . ' ' . $furigana_mei;
$send_date = date('Y/n/j H:i');

$grade_code_for_db = $grade_code === '' ? null : $grade_code;
$building_name_for_db = normalize_nullable_string($building_name);
$school_district_for_db = normalize_nullable_string($school_district);
$notes_for_db = normalize_nullable_string($notes);

$db = null;

try {
  $db = db_connect();
  $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  $db->beginTransaction();

  $insert_sql = <<<'SQL'
INSERT INTO t_application_form01 (
  course_title_code,
  course_name,
  last_name,
  first_name,
  last_name_kana,
  first_name_kana,
  age,
  grade_code,
  gender_code,
  postal_code,
  address_city,
  address_street,
  address_building,
  school_district,
  phone,
  email,
  notes,
  admin_status,
  user_mail_status,
  admin_mail_status
) VALUES (
  :course_title_code,
  :course_name,
  :last_name,
  :first_name,
  :last_name_kana,
  :first_name_kana,
  :age,
  :grade_code,
  :gender_code,
  :postal_code,
  :address_city,
  :address_street,
  :address_building,
  :school_district,
  :phone,
  :email,
  :notes,
  0,
  0,
  0
)
SQL;

  $insert_statement = $db->prepare($insert_sql);
  $insert_statement->bindValue(':course_title_code', (int)$course_title_code, PDO::PARAM_INT);
  $insert_statement->bindValue(':course_name', $course_name, PDO::PARAM_STR);
  $insert_statement->bindValue(':last_name', $name_sei, PDO::PARAM_STR);
  $insert_statement->bindValue(':first_name', $name_mei, PDO::PARAM_STR);
  $insert_statement->bindValue(':last_name_kana', $furigana_sei, PDO::PARAM_STR);
  $insert_statement->bindValue(':first_name_kana', $furigana_mei, PDO::PARAM_STR);
  $insert_statement->bindValue(':age', (int)$age, PDO::PARAM_INT);
  bind_nullable_string($insert_statement, ':grade_code', $grade_code_for_db);
  $insert_statement->bindValue(':gender_code', $gender_code, PDO::PARAM_STR);
  $insert_statement->bindValue(':postal_code', $post_number, PDO::PARAM_STR);
  $insert_statement->bindValue(':address_city', $city, PDO::PARAM_STR);
  $insert_statement->bindValue(':address_street', $street_address, PDO::PARAM_STR);
  bind_nullable_string($insert_statement, ':address_building', $building_name_for_db);
  bind_nullable_string($insert_statement, ':school_district', $school_district_for_db);
  $insert_statement->bindValue(':phone', $phone, PDO::PARAM_STR);
  $insert_statement->bindValue(':email', $email, PDO::PARAM_STR);
  bind_nullable_string($insert_statement, ':notes', $notes_for_db);
  $insert_statement->execute();

  $application_id = (int)$db->lastInsertId();
  $db->commit();
} catch (Throwable $e) {
  if ($db instanceof PDO && $db->inTransaction()) {
    $db->rollBack();
  }

  if ($db instanceof PDO) {
    db_disconnect($db);
  }

  json_exit(500, [
    'success' => false,
    'error' => '受付処理に失敗しました。時間をおいて再度お試しください。',
  ]);
}

$admin_to = 'debug01@a-fact.co.jp';
$admin_cc_email = 'info@a-fact.co.jp';
$admin_to_name = '熊本市中央公民館';
$from_name = '熊本市中央公民館';
$from_email = 'kouza@shirakawa-chuo-cc.com';
$subject = '講座申し込みを受け付けました。';

$user_address = trim($city . $street_address . ($building_name !== '' ? ' ' . $building_name : ''));

$user_mail_body = <<<EOT
{$name} 様

講座申し込みありがとうございます。
※本フォームは申し込みで、予約確定ではありませんのでご注意ください。

EOT;

$user_mail_body .= "\n【お申し込み内容】\n";
$user_mail_body .= "講座区分：{$course_title}\n";
$user_mail_body .= "受講希望講座：{$course_name}\n";
$user_mail_body .= "お名前：{$name}\n";
$user_mail_body .= "ふりがな：{$furigana}\n";
$user_mail_body .= "年齢：{$age}\n";
if ($grade !== '') {
  $user_mail_body .= "学年：{$grade}\n";
}
$user_mail_body .= "性別：{$gender}\n";
$user_mail_body .= "郵便番号：{$post_number}\n";
$user_mail_body .= "住所：{$user_address}\n";
if ($school_district !== '') {
  $user_mail_body .= "校区：{$school_district}\n";
}
$user_mail_body .= "電話番号：{$phone}\n";
$user_mail_body .= "メールアドレス：{$email}\n";
if ($notes !== '') {
  $user_mail_body .= "備考：{$notes}\n";
}

$admin_from_name = '熊本市中央公民館 講座申し込み';
$admin_from_email = 'contact@shirakawa-chuo-cc.com';
$admin_subject = '【熊本市中央公民館】講座申し込みを受け付けました';

$mail_data = [
  'course_title' => $course_title,
  'course_name' => $course_name,
  'name' => $name,
  'furigana' => $furigana,
  'age' => $age,
  'grade' => $grade,
  'gender' => $gender,
  'post_number' => $post_number,
  'city' => $city,
  'street_address' => $street_address,
  'building_name' => $building_name,
  'school_district' => $school_district,
  'phone' => $phone,
  'email' => $email,
  'notes' => $notes,
  'send_date' => $send_date,
];

$mail_body = build_mail_body($mail_data);

$user_mail_result = send_japanese_mail(
  $email,
  $name,
  $subject,
  $user_mail_body,
  $from_name,
  $from_email,
  $from_email
);

$admin_mail_result = send_japanese_mail(
  $admin_to,
  $admin_to_name,
  $admin_subject,
  $mail_body,
  $admin_from_name,
  $admin_from_email,
  $email,
  $admin_cc_email
);

$user_mail_status = $user_mail_result['success'] ? 1 : 2;
$user_mail_sent_at = $user_mail_result['success'] ? date('Y-m-d H:i:s') : null;
$user_mail_error_message = $user_mail_result['success'] ? null : $user_mail_result['error'];

$admin_mail_status = $admin_mail_result['success'] ? 1 : 2;
$admin_mail_sent_at = $admin_mail_result['success'] ? date('Y-m-d H:i:s') : null;
$admin_mail_error_message = $admin_mail_result['success'] ? null : $admin_mail_result['error'];

try {
  $update_sql = <<<'SQL'
UPDATE t_application_form01
SET
  user_mail_status = :user_mail_status,
  user_mail_sent_at = :user_mail_sent_at,
  user_mail_error_message = :user_mail_error_message,
  admin_mail_status = :admin_mail_status,
  admin_mail_sent_at = :admin_mail_sent_at,
  admin_mail_error_message = :admin_mail_error_message
WHERE application_id = :application_id
SQL;

  $update_statement = $db->prepare($update_sql);
  $update_statement->bindValue(':user_mail_status', $user_mail_status, PDO::PARAM_INT);
  bind_nullable_string($update_statement, ':user_mail_sent_at', $user_mail_sent_at);
  bind_nullable_string($update_statement, ':user_mail_error_message', $user_mail_error_message);
  $update_statement->bindValue(':admin_mail_status', $admin_mail_status, PDO::PARAM_INT);
  bind_nullable_string($update_statement, ':admin_mail_sent_at', $admin_mail_sent_at);
  bind_nullable_string($update_statement, ':admin_mail_error_message', $admin_mail_error_message);
  $update_statement->bindValue(':application_id', $application_id, PDO::PARAM_INT);
  $update_statement->execute();
} catch (Throwable $e) {
  log_mail_status_update_failure(
    $application_id,
    $user_mail_status,
    $admin_mail_status,
    $e->getMessage()
  );
}

if ($db instanceof PDO) {
  db_disconnect($db);
}

json_exit(200, [
  'success' => true,
  'applicationId' => $application_id,
  'mail' => [
    'user' => $user_mail_result['success'] ? 'sent' : 'failed',
    'admin' => $admin_mail_result['success'] ? 'sent' : 'failed',
  ],
  'message' => 'お問い合わせを送信しました。',
]);
