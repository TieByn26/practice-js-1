import pic_chart1 from "@/assets/images/pic-chart1.png";
import pic_chart2 from "@/assets/images/pic-chart2.png";
import pic_avatar from "@/assets/images/pic-avatar.png";
import pic_dot from "@/assets/images/pic-dot.svg";
import pic_white from "@/assets/images/white.png";
import ic_chevron_up from "@/assets/images/chevron-up.svg";
import ic_reward_blue from "@/assets/images/reward.svg";
import pic_thumbnail_add from "@/assets/images/form.jpg";
import pic_thumbnail_detail from "@/assets/images/thumbnail.jpg";

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
    loadImage(pic_dot),
    loadImage(pic_white),
    loadImage(ic_chevron_up),
    loadImage(ic_reward_blue),
    loadImage(pic_thumbnail_add),
    loadImage(pic_thumbnail_detail),
]);

export {pic_chart1, pic_chart2, pic_avatar, pic_dot, pic_white, ic_chevron_up, ic_reward_blue, pic_thumbnail_add, pic_thumbnail_detail};