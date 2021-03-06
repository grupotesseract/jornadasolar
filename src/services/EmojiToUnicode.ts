interface IEmojiToUnicode {
  call(emoji): Array<string>
}

export default class EmojiToUnicode implements IEmojiToUnicode {
  call(emoji: string): Array<string> {
    const emojiUnicodes = []
    const codes = this.sliceEmoji(emoji).map(this.hex)
    codes[0].map(code => emojiUnicodes.push(code))
    return emojiUnicodes
  }

  private sliceEmoji(str) {
    const res = ['', '']

    for (const caracter of str) {
      const codePoint = caracter.codePointAt(0)
      const isEmoji =
        codePoint > 0xfff ||
        codePoint === 0x200d ||
        (codePoint >= 0xfe00 && codePoint <= 0xfeff)
      if (!isEmoji) {
        return ['', '']
      }
      res[1 - ((isEmoji as unknown) as number)] += caracter
    }
    return res
  }

  private hex(str) {
    return [...str].map(x => x.codePointAt(0).toString(16))
  }
}
