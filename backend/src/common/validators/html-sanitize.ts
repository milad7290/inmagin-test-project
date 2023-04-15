import * as sanitizeHtml from 'sanitize-html';

export const HtmlSanitizer = (params: { value?: string }) =>
  !!params.value
    ? sanitizeHtml(params.value, {
        allowedTags: [],
        allowedSchemes: [],
        disallowedTagsMode: 'discard',
        allowProtocolRelative: false,
      })
    : null;
