export function getLink(link: string = "") {
    const domain = getSiteDomain(link);
    let woStart = link.replace(/(^\w+:|^)\/\//, '');
    let subs = woStart.split("/");
    let product = subs[1] ? subs[1].replace(/-/g, " ") : "No Item Selected";

    switch (domain) {
        case "amazon":
            return subs[1]?.replace(/-/g, " ") || "No Item Selected";
        case "walmart":
        case "target":
            return subs[2]?.replace(/-/g, " ") || "No Item Selected";
        case "ebay":
            return subs[3]?.replace(/-/g, " ") || "No Item Selected";
        case "bestbuy":
            return subs[2]?.replace(/-/g, " ") || "No Item Selected";
        case "newegg":
            return subs[1]?.replace(/-/g, " ") || "No Item Selected";
        case "homedepot":
            return subs[2]?.replace(/-/g, " ") || "No Item Selected";
        case "lowes":
            return subs[2]?.replace(/-/g, " ") || "No Item Selected";
        case "wayfair":
            return subs[1]?.replace(/-/g, " ") || "No Item Selected";
        case "aliexpress":
            return subs[1]?.replace(/-/g, " ") || "No Item Selected";
        case "overstock":
            return subs[1]?.replace(/-/g, " ") || "No Item Selected";
        case "rakuten":
            return subs[1]?.replace(/-/g, " ") || "No Item Selected";
        case "macys":
            return subs[2]?.replace(/-/g, " ") || "No Item Selected";
        case "nordstrom":
            return subs[2]?.replace(/-/g, " ") || "No Item Selected";
        case "zappos":
            return subs[1]?.replace(/-/g, " ") || "No Item Selected";
        default:
            return product;
    }
}

function getSiteDomain(link: string) {
    if (link.includes("amazon"))
        return "amazon";
    else if (link.includes("walmart"))
        return "walmart";
    else if (link.includes("target"))
        return "target";
    else if (link.includes("ebay"))
        return "ebay";
    else if (link.includes("bestbuy"))
        return "bestbuy";
    else if (link.includes("newegg"))
        return "newegg";
    else if (link.includes("homedepot"))
        return "homedepot";
    else if (link.includes("lowes"))
        return "lowes";
    else if (link.includes("wayfair"))
        return "wayfair";
    else if (link.includes("aliexpress"))
        return "aliexpress";
    else if (link.includes("overstock"))
        return "overstock";
    else if (link.includes("rakuten"))
        return "rakuten";
    else if (link.includes("macys"))
        return "macys";
    else if (link.includes("nordstrom"))
        return "nordstrom";
    else if (link.includes("zappos"))
        return "zappos";
    else
        return link.replace(/(^\w+:|^)\/\//, '').split("/")[0] || "";
}
