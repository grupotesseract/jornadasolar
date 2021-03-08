interface IUnicodeToEmoji {
  call(emojiUnicodes): string
}

export default class UnicodeToEmoji implements IUnicodeToEmoji {
  call(emojiUnicodes: Array<string>): string {
    const emoji = emojiUnicodes
      .map(unicode => String.fromCodePoint(parseInt(unicode, 16)))
      .join('')

    return emoji
  }
}
