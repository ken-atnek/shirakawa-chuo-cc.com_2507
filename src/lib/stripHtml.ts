/**
 * 改行（<br>）以外の HTML タグを除去する関数
 * @param html - HTML 文字列
 * @returns 改行のみ残したテキスト
 */
export function stripHtmlExceptBr(html: string): string {
  const placeholder = '__BR_PLACEHOLDER__';
  const withPlaceholder = html.replace(/<br\s*\/?>/gi, placeholder);
  const withoutTags = withPlaceholder.replace(/<[^>]+>/g, '');
  return withoutTags.replace(new RegExp(placeholder, 'g'), '\n');
}
