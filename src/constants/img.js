import pic_chart1 from "@/assets/images/pic-chart1.png";
import pic_chart2 from "@/assets/images/pic-chart2.png";
import pic_avatar from "@/assets/images/pic-avatar.png";
import pic_dot from "@/assets/images/pic-dot.svg";

const loadImage = async (pathImage) => {
    try {
        const response = await fetch(pathImage);
        return response.ok ? response.text() : null;
    } catch (error) {
        console.error(`Failed to load icon from ${pathIcon}:`, error);
        return null;
    }
};
const [] = await Promise.all([
    loadImage(pic_chart1),
    loadImage(pic_chart2),
    loadImage(pic_avatar),
    loadImage(pic_dot)
]);

export {pic_chart1, pic_chart2, pic_avatar, pic_dot};