export const getIp = async () => {
    const res = await fetch('https://api.ipify.org?format=json');
    const data = await res.json();
    return JSON.stringify(data)
}