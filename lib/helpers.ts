export const zeroPad = (number: number, length: number): string => {
  let str = String(number);
  while (str.length < length) {
    str = '0' + str;
  }
  return str;
};

export const formatDate = (date: Date | string, includeTime: boolean = false, includeDate: boolean = true): string => {
  const d = new Date(date);
  const dateString = `${zeroPad(d.getDate(), 2)}/${zeroPad(d.getMonth() + 1, 2)}/${zeroPad(d.getFullYear(), 2)}`;
  const time = ` ${zeroPad(d.getHours(), 2)}:${zeroPad(d.getMinutes(), 2)}`;
  return (includeDate ? dateString : '') + (includeTime ? time : '');
};


export async function listSerialPorts() {
  try {
    console.log(navigator)
    const ports = await navigator.serial.getPorts();
    return ports;
  } catch (error) {
    console.error("Error listing serial ports:", error);
    return [];
  }
}