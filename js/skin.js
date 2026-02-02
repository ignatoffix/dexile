const input = document.getElementById("skinInput");
const canvas = document.getElementById("skinCanvas");
const ctx = canvas.getContext("2d");

ctx.imageSmoothingEnabled = false;

input.addEventListener("change", () => {
    const file = input.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
        const img = new Image();
        img.onload = () => drawSkin(img);
        img.src = reader.result;
    };
    reader.readAsDataURL(file);
});

function drawSkin(img) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // ГОЛОВА
    ctx.drawImage(img, 8, 8, 8, 8, 48, 0, 64, 64);

    // ТЕЛО
    ctx.drawImage(img, 20, 20, 8, 12, 48, 64, 64, 96);

    // ЛЕВАЯ РУКА
    ctx.drawImage(img, 44, 20, 4, 12, 16, 64, 32, 96);

    // ПРАВАЯ РУКА
    ctx.drawImage(img, 36, 52, 4, 12, 112, 64, 32, 96);

    // ЛЕВАЯ НОГА
    ctx.drawImage(img, 4, 20, 4, 12, 48, 160, 32, 96);

    // ПРАВАЯ НОГА
    ctx.drawImage(img, 20, 52, 4, 12, 80, 160, 32, 96);
}
