export async function loadContent(lang) {
    const response = await fetch(`./lang/${lang}.json`);
    return response.json();
}

export async function loadImageConfig() {
    const response = await fetch("./config/img_config.json");
    return response.json();
}
