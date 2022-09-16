export function sort<T>(list: Array<any>, fieldName: string): Array<T> {
    return list.sort((a, b) => a[fieldName] - b[fieldName]);
}