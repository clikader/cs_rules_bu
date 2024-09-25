// 国内DNS服务器
const domesticNameservers = [
    "https://dns.alidns.com/dns-query", // 阿里云公共DNS
];
// 国外DNS服务器
const foreignNameservers = [
    "https://9.9.9.9/dns-query", // Quad9
    "https://1.1.1.1/dns-query", // Cloudflare(主)
    "https://1.0.0.1/dns-query", // Cloudflare(备)
];
// DNS配置
const dnsConfig = {
    "enable": true,
    "listen": "0.0.0.0:1053",
    "ipv6": true,
    "use-system-hosts": false,
    "cache-algorithm": "arc",
    "enhanced-mode": "fake-ip",
    "fake-ip-range": "198.18.0.1/16",
    "fake-ip-filter": [
        // 本地主机/设备
        "+.lan",
        "+.local",
        // Windows网络出现小地球图标
        "+.msftconnecttest.com",
        "+.msftncsi.com",
        // QQ快速登录检测失败
        "localhost.ptlogin2.qq.com",
        "localhost.sec.qq.com",
        // 微信快速登录检测失败
        "localhost.work.weixin.qq.com"
    ],
    "default-nameserver": ["223.5.5.5", "114.114.114.114", "1.1.1.1", "9.9.9.9"],
    "nameserver": [...domesticNameservers, ...foreignNameservers],
    "proxy-server-nameserver": [...domesticNameservers, ...foreignNameservers],
    "nameserver-policy": {
        "geosite:private,cn,geolocation-cn": domesticNameservers,
        "geosite:google,youtube,telegram,gfw,geolocation-!cn": foreignNameservers
    }
};
// 规则集通用配置
const ruleProviderCommon = {
    "type": "http",
    "format": "yaml",
    "interval": 86400
};
// 规则集配置
const ruleProviders = {
    "direct": {
        ...ruleProviderCommon,
        "behavior": "domain",
        "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/direct.txt",
        "path": "./ruleset/loyalsoldier/direct.yaml"
    },
    "private": {
        ...ruleProviderCommon,
        "behavior": "domain",
        "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/private.txt",
        "path": "./ruleset/loyalsoldier/private.yaml"
    },
    "gfw": {
        ...ruleProviderCommon,
        "behavior": "domain",
        "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/gfw.txt",
        "path": "./ruleset/loyalsoldier/gfw.yaml"
    },
    "geo-not-cn": {
        ...ruleProviderCommon,
        "behavior": "domain",
        "url": "https://mirror.ghproxy.com/https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/geolocation-!cn.yaml",
        "path": "./ruleset/clikader/geo-not-cn.yaml"
    },
    "cncidr": {
        ...ruleProviderCommon,
        "behavior": "ipcidr",
        "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/cncidr.txt",
        "path": "./ruleset/loyalsoldier/cncidr.yaml"
    },
    "lancidr": {
        ...ruleProviderCommon,
        "behavior": "ipcidr",
        "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/lancidr.txt",
        "path": "./ruleset/loyalsoldier/lancidr.yaml"
    },
    "applications": {
        ...ruleProviderCommon,
        "behavior": "classical",
        "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/applications.txt",
        "path": "./ruleset/loyalsoldier/applications.yaml"
    },
    "microsoft": {
        ...ruleProviderCommon,
        "behavior": "classical",
        "url": "https://mirror.ghproxy.com/https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Microsoft/Microsoft.yaml",
        "path": "./ruleset/clikader/microsoft.yaml"
    },
    "bing": {
        ...ruleProviderCommon,
        "behavior": "classical",
        "url": "https://mirror.ghproxy.com/https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Bing/Bing.yaml",
        "path": ".ruleset/clikader/bing.yaml"
    },
    "copilot": {
        ...ruleProviderCommon,
        "behavior": "classical",
        "url": "https://mirror.ghproxy.com/https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Copilot/Copilot.yaml",
        "path": "./ruleset/clikader/copilot.yaml"
    },
    "claude": {
        ...ruleProviderCommon,
        "behavior": "classical",
        "url": "https://mirror.ghproxy.com/https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Claude/Claude.yaml",
        "path": "./ruleset/clikader/claude.yaml"
    },
    "bard": {
        ...ruleProviderCommon,
        "behavior": "classical",
        "url": "https://mirror.ghproxy.com/https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/BardAI/BardAI.yaml",
        "path": "./ruleset/clikader/bard.yaml"
    },
    "openai": {
        ...ruleProviderCommon,
        "behavior": "classical",
        "url": "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/OpenAI/OpenAI.yaml",
        "path": "./ruleset/blackmatrix7/openai.yaml"
    },
    "steam": {
        ...ruleProviderCommon,
        "behavior": "classical",
        "url": "https://mirror.ghproxy.com/https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Steam/Steam.yaml",
        "path": "./ruleset/clikader/steam.yaml"
    },
    "jetbrains": {
        ...ruleProviderCommon,
        "behavior": "classical",
        "url": "https://mirror.ghproxy.com/https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/rule/Clash/Jetbrains/Jetbrains.yaml",
        "path": "./ruleset/clikader/jetbrains.yaml"
    }
};
// 规则
const rules = [
    // high priority direct rules
    "RULE-SET,direct,DIRECT",
    "RULE-SET,private,DIRECT",
    // AI services
    "RULE-SET,copilot,AI",
    "RULE-SET,claude,AI",
    "RULE-SET,bard,AI",
    "Rule-SET,openai,AI",
    // common pleasure and work tools
    "RULE-SET,steam,PROXY",
    "RULE-SET,jetbrains,PROXY",
    "RULE-SET,microsoft,MicroSoft",
    "RULE-SET,bing,MicroSoft",
    "RULE-SET,applications,DIRECT",
    // other rules
    "RULE-SET,lancidr,DIRECT,no-resolve",
    "RULE-SET,cncidr,DIRECT,no-resolve",
    "RULE-SET,gfw,PROXY",
    "RULE-SET,geo-not-cn,PROXY",
    "GEOIP,LAN,DIRECT,no-resolve",
    "GEOIP,CN,DIRECT,no-resolve",
    "MATCH,PROXY"
];
// 代理组通用配置
const groupBaseOption = {
    "interval": 300,
    "timeout": 3000,
    "url": "https://www.google.com/generate_204",
    "lazy": true,
    "max-failed-times": 3,
    "hidden": false
};

// 程序入口
function main(config) {
    const proxyCount = config?.proxies?.length ?? 0;
    const proxyProviderCount =
        typeof config?.["proxy-providers"] === "object" ? Object.keys(config["proxy-providers"]).length : 0;
    if (proxyCount === 0 && proxyProviderCount === 0) {
        throw new Error("No proxy server found.");
    }

    // 覆盖原配置中DNS配置
    config["dns"] = dnsConfig;

    // 覆盖原配置中的代理组
    config["proxy-groups"] = [
        {
            ...groupBaseOption,
            "name": "PROXY",
            "type": "select",
            "proxies": ["HK", "JP", "US", "SG", "TW", "EU", "AUTO", "MANUAL"],
            "icon": "https://mirror.ghproxy.com/https://raw.githubusercontent.com/xushier/HD-Icons/main/border-radius/Teslamate_A.png"
        },
        // Area Groups
        {
            ...groupBaseOption,
            "name": "HK",
            "type": "select",
            "include-all": true,
            "filter": "(?i)hk|HongKong|香港|Hong Kong|HK|🇭🇰",
            "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置",
            "icon": "https://mirror.ghproxy.com/https://raw.githubusercontent.com/lipis/flag-icons/main/flags/1x1/hk.svg",
        },
        {
            ...groupBaseOption,
            "name": "JP",
            "type": "select",
            "include-all": true,
            "filter": "(?i)日本|Japan|东京|大阪|JP|🇯🇵",
            "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置",
            "icon": "https://mirror.ghproxy.com/https://raw.githubusercontent.com/lipis/flag-icons/main/flags/1x1/jp.svg",
        },
        {
            ...groupBaseOption,
            "name": "SG",
            "type": "select",
            "include-all": true,
            "filter": "(?i)新加坡|Singapore|狮城|SG|🇸🇬",
            "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置",
            "icon": "https://mirror.ghproxy.com/https://raw.githubusercontent.com/lipis/flag-icons/main/flags/1x1/sg.svg",
        },
        {
            ...groupBaseOption,
            "name": "US",
            "type": "select",
            "include-all": true,
            "filter": "(?i)美国|USA|US|United States|🇺🇸",
            "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置",
            "icon": "https://mirror.ghproxy.com/https://raw.githubusercontent.com/lipis/flag-icons/main/flags/1x1/us.svg",
        },
        {
            ...groupBaseOption,
            "name": "TW",
            "type": "select",
            "include-all": true,
            "filter": "(?i)台湾|新北|彰化|TW|Taiwan|🇹🇼",
            "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置",
            "icon": "https://mirror.ghproxy.com/https://raw.githubusercontent.com/lipis/flag-icons/main/flags/1x1/tw.svg",
        },
        {
            ...groupBaseOption,
            "name": "EU",
            "type": "select",
            "include-all": true,
            "filter": "(?i)TR|GB|FR|UK|DE|Germany|Turkey|Netherlands|Italy|France|Great Britain|Ukraine|Argentina|[^-]德|[^-]英|土耳其|法国|荷兰|阿根廷|丹麦|挪威|瑞典|芬兰|冰岛|瑞士|捷克|希腊|波兰|黑山|乌克兰|卢森堡|匈牙利|意大利|🇪🇺",
            "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置",
            "icon": "https://mirror.ghproxy.com/https://raw.githubusercontent.com/lipis/flag-icons/main/flags/1x1/eu.svg",
        },
        // Area Groups End
        {
            ...groupBaseOption,
            "name": "MANUAL",
            "type": "select",
            "include-all": true,
            "icon": "https://mirror.ghproxy.com/https://raw.githubusercontent.com/xushier/HD-Icons/main/border-radius/Miniflux_A.png"
        },
        {
            ...groupBaseOption,
            "name": "AUTO",
            "type": "url-test",
            "include-all": true,
            "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置",
            "icon": "https://mirror.ghproxy.com/https://raw.githubusercontent.com/xushier/HD-Icons/main/border-radius/Teslamate_A.png"
        },
        {
            ...groupBaseOption,
            "name": "EMBY",
            "type": "select",
            "include-all": true,
            "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置",
            "icon": "https://mirror.ghproxy.com/https://raw.githubusercontent.com/xushier/HD-Icons/main/border-radius/Emby_A.png"
        },
        {
            ...groupBaseOption,
            "name": "AI",
            "type": "select",
            "proxies": ["PROXY", "JP", "US", "SG"],
            "icon": "https://mirror.ghproxy.com/https://raw.githubusercontent.com/xushier/HD-Icons/main/border-radius/Chatgpt_A.png"
        },
        {
            ...groupBaseOption,
            "name": "MicroSoft",
            "type": "select",
            "proxies": ["DIRECT", "PROXY", "HK", "JP", "US", "SG", "TW", "EU"],
            "icon": "https://mirror.ghproxy.com/https://raw.githubusercontent.com/xushier/HD-Icons/main/border-radius/Azure_A.png"
        },
        {
            ...groupBaseOption,
            "name": "GLOBAL",
            "type": "select",
            "proxies": ["PROXY", "HK", "JP", "US", "SG", "TW", "EU", "AUTO"],
            "icon": "https://mirror.ghproxy.com/https://raw.githubusercontent.com/xushier/HD-Icons/main/border-radius/Googleearth_A.png"
        },
    ];

    // 覆盖原配置中的规则
    config["rule-providers"] = ruleProviders;
    config["rules"] = rules;

    // 返回修改后的配置
    return config;
}