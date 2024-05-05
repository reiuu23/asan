export default function ColorGenerator() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}
