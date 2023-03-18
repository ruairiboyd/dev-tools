type InterfaceFormatOptions = {
  indentSize?: number;
  indentChar?: string;
  lineEnding?: string;
};

export default function JsonToTypescript(
  json: object,
  interfaceName: string = "MyInterface",
  formatOptions: InterfaceFormatOptions = {}
): string {
  const indentSize = formatOptions.indentSize ?? 2;
  const indentChar = formatOptions.indentChar ?? " ";
  const lineEnding = formatOptions.lineEnding ?? "\n";
  let interfaceCode = `interface ${interfaceName} {${lineEnding}`;

  for (const [key, value] of Object.entries(json)) {
    let type: string = typeof value;
    if (Array.isArray(value)) {
      type = `${typeof value[0]}[]`;
    }
    interfaceCode += `${indentChar.repeat(
      indentSize
    )}${key}: ${type};${lineEnding}`;
  }

  interfaceCode += `}${lineEnding}`;
  return interfaceCode;
}
