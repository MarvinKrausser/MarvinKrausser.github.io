export function formatDate(date, locale) {
    const dateObj = new Date(date);

    if (isNaN(dateObj.getTime())) {
        return date;
    }

    return new Intl.DateTimeFormat(locale || "de-DE", {
        dateStyle: "medium"
    }).format(dateObj);
}

// "from <start> to <end>", with the wording taken from the language file.
export function formatDateRange(item) {
    const startDate = formatDate(item.start, item.locale);
    const endDate = formatDate(item.end, item.locale);

    return item.from + "\n" + startDate + "\n" + item.to + "\n" + endDate;
}
