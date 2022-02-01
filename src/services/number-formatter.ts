export class NumberFormatter {
  format(
    value: string,
    length: number,
    groupLength: number,
    withSpaces: boolean = true
  ) {
    value = value.replace(/[^\d+]/g, "").substring(0, length);

    const numbersGroups = [];

    for (let i = 0; i < value.length; i += groupLength) {
      numbersGroups.push(value.substring(i, i + groupLength));
    }

    return numbersGroups.join(withSpaces ? " " : "");
  }
}
