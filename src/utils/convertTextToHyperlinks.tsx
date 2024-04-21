export const convertTextToHyperlinks = (text: string) => {
    // Wyrażenie regularne do wyszukiwania linków HTTP/HTTPS/FTP
    const linkRegex = /(?:https?|ftp):\/\/[^\s/$.?#].[^\s]*/g;
    // Wyrażenie regularne do wyszukiwania linków bez protokołu (www)
    const wwwLinkRegex = /(?:(?:www\.)|(?:www2\.)|(?:www3\.))(?:\S+)/g;
    // Wyrażenie regularne do wyszukiwania numerów telefonów
    const phoneRegex = /(?:\+\d{1,3}(?:[- ]*\d+){1,12})|(?:\(\d{2,}\)(?:[- ]*\d+){1,10})|(?:\d{3}(?:[- ]*\d+){2,10})|(?:\d{4}(?:[- ]*\d+){1,9})/g;

    // Zamień linki HTTP/HTTPS/FTP na hiperłącza
    let textWithHyperlinks = text.replace(linkRegex, (match) => `<a href="${match}" target="_blank">${match}</a>`);
    // Zamień linki bez protokołu na hiperłącza
    textWithHyperlinks = textWithHyperlinks.replace(wwwLinkRegex, (match) => `<a href="http://${match}" target="_blank">${match}</a>`);
    // Zamień numery telefonów na hiperłącza
    textWithHyperlinks = textWithHyperlinks.replace(phoneRegex, (match) => `<span style="color: green; cursor: pointer;" onclick="copyToClipboard('${match}')">${match}</span>`);

    return textWithHyperlinks;
};
