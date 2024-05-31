export const convertTextToHyperlinks = (text: string) => {
    const linkRegex = /(?:https?|ftp):\/\/[^\s/$.?#[\])]+(?:\)|\])?.[^\s[\])"]*/g;
    const wwwLinkRegex = /(?:(?:www\.)|(?:www2\.)|(?:www3\.))(?:\S+)/g;
    const phoneRegex = /(?:\+\d{1,3}(?:[- ]*\d+){1,12})|(?:\(\d{2,}\)(?:[- ]*\d+){1,10})|(?:\d{3}(?:[- ]*\d+){2,10})|(?:\d{4}(?:[- ]*\d+){1,9})/g;
    const wordsToColorRed = ['Mateusz', 'Gapp'];
    const wordsToUnderline = ['example3', 'example4'];

    let textWithHyperlinks = text;

    const imgTagRegex = /<img\b[^>]*>/gi;
    const imgTags = text.match(imgTagRegex);
    if (imgTags) {
        imgTags.forEach(imgTag => {
            textWithHyperlinks = textWithHyperlinks.replace(imgTag, '');
        });
    }
    const textWithoutImgTags = textWithHyperlinks.replace(imgTagRegex, '');
    textWithHyperlinks = textWithoutImgTags.replace(linkRegex, (match) => `<a href="${match}" target="_blank">${match}</a>`);
    textWithHyperlinks = textWithHyperlinks.replace(wwwLinkRegex, (match) => `<a href="http://${match}" target="_blank">${match}</a>`);
    textWithHyperlinks = textWithHyperlinks.replace(phoneRegex, (match) => `<span style="color: green; cursor: pointer;" onclick="copyToClipboard('${match}')">${match}</span>`);

    wordsToColorRed.forEach(word => {
        const wordRegex = new RegExp(`\\b${word}\\b`, 'g');
        textWithHyperlinks = textWithHyperlinks.replace(wordRegex, `<span style="color: azure;">${word}</span>`);
    });

    wordsToUnderline.forEach(word => {
        const wordRegex = new RegExp(`\\b${word}\\b`, 'g');
        textWithHyperlinks = textWithHyperlinks.replace(wordRegex, `<span style="text-decoration: underline;">${word}</span>`);
    });

    imgTags?.forEach(imgTag => {
        textWithHyperlinks = textWithHyperlinks.replace('', imgTag);
    });
    return textWithHyperlinks;
};
