const CATEGORY_STYLING_MAP = {
    "Work": {"icon": "assets/icons/icon-work.svg", "class": "bg-orange-300"},
    "Play": {"icon": "assets/icons/icon-play.svg", "class": "bg-blue-300"},
    "Study": {"icon": "assets/icons/icon-study.svg", "class": "bg-pink-400"},
    "Exercise": {"icon": "assets/icons/icon-exercise.svg", "class": "bg-green-400"},
    "Social": {"icon": "assets/icons/icon-social.svg", "class": "bg-purple-700"},
    "Self Care": {"icon": "assets/icons/icon-self-care.svg", "class": "bg-yellow-300"},
}

const getPreviousDateString = (mode, value) => {
    const hoursSuffix = getHoursSuffix(value);
    switch (mode) {
        case "daily":
            return `Yesterday - ${value}${hoursSuffix}`;
        case "weekly":
            return `Last Week - ${value}${hoursSuffix}`;
        case "monthly":
            return `Last Month - ${value}${hoursSuffix}`;
    }
}

const getHoursSuffix = (value) => {
    return value <= 1 ? "hr" : "hrs";
}

const dataList = document.getElementById("data-list");

const dailyBtn = document.getElementById("daily");
const weeklyBtn = document.getElementById("weekly");
const monthlyBtn = document.getElementById("monthly");
const filterButtons = [dailyBtn, weeklyBtn, monthlyBtn];

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        for (const item of filterButtons) {
            if (item.id !== button.id) {
                item.setAttribute("data-active", "false");
            } else {
                item.setAttribute("data-active", "true");
                mode = item.id;
                renderData();
            }
        }
    })
})
let mode = 'daily';
let userData;

const appendItem = (item) => {
    dataList.insertAdjacentHTML('beforeend', `
        <li class="${CATEGORY_STYLING_MAP[item.title].class} overflow-hidden rounded-[15px] bg-no-repeat pt-[2.375rem] lg:w-[255px]" style="background-image: url(${CATEGORY_STYLING_MAP[item.title].icon}); background-position: top -10px right 10px;">
            <div class="rounded-t-[15px] bg-navy-900 p-6 lg:p-8">
                <div class="flex flex-col gap-2 md:gap-4 lg:gap-6">
                    <div class="flex items-center justify-between">
                        <span class="text-5-medium text-white">${item.title}</span>
                        <img src="assets/icons/icon-ellipsis.svg" alt="Ellipsis" class="h-[5px] w-[21px] cursor-pointer"/>
                    </div>
                    <div class="flex items-center justify-between md:flex-col md:gap-2 md:justify-start md:items-start md:w-[170px] lg:w-auto">
                        <span class="text-3 text-white md:text-1">${item.timeframes[mode].current}${getHoursSuffix(item.timeframes[mode].current)}</span>
                        <span class="text-6 text-navy-200">${getPreviousDateString(mode, item.timeframes[mode].previous)}</span>
                    </div>
                </div>
            </div>
        </li>
    `);
};


fetch("data/data.json")
    .then(response => response.json())
    .then(data => {
        userData = data;
        renderData();
    })

const renderData = () => {
    dataList.innerHTML = '';
    userData.forEach(appendItem);
}