export const getDate = () => {
    const currentDate = new Date();

    const year = currentDate.getFullYear(); // Pobierz rok (np. 2023)
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Pobierz miesiąc (od 0 do 11), dodaj 1 aby uzyskać standardowy numer miesiąca (1-12), i wyrównaj do dwóch cyfr (np. "04")
    const day = String(currentDate.getDate()).padStart(2, '0'); // Pobierz dzień miesiąca i wyrównaj do dwóch cyfr (np. "23")
    const hours = String(currentDate.getHours()).padStart(2, '0'); // Pobierz godzinę i wyrównaj do dwóch cyfr (np. "12")
    const minutes = String(currentDate.getMinutes()).padStart(2, '0'); // Pobierz minutę i wyrównaj do dwóch cyfr (np. "05")
    const seconds = String(currentDate.getSeconds()).padStart(2, '0'); // Pobierz sekundę i wyrównaj do dwóch cyfr (np. "59")
    
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
}