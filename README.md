# AMOREPACIFIC
# AP 브랜드웹사이트 리뉴얼 구축
기간 : 2022.09.19 ~ 2023.02.28


### 폴더구조
```
+ newAP
    + INT
        + 01.main
        + 02.gnb
        + 03.plp
        + 04.pdp
        + 05.the_essentials
        + 06.prime_reserve
        + 07.discover
        + 08.search
        + 09.store
        + 10.etc
    +CN
        + 01.main
        + 02.gnb
        + 03.plp
        + 04.pdp
        + 05.the_essentials
        + 06.prime_reserve
        + 07.discover
        + 08.search
        + 09.store
        + 10.etc
    + resource
        + INT
            + css
            + js
            + images
                + common
            + font
        + CN
    index.html
```

### Library
```
https://jquery.com/ - v3.4.1
https://swiperjs.com/ - v6.8.2
```


### Visual Studio Code - Settings.json
```
{
    "git.confirmSync": false,
    "gitlens.advanced.messages": {
        "suppressGitMissingWarning": true
    },
    "emmet.preferences": {
        "css.valueSeparator":":",
        "css.propertyEnd":""
    },
    "liveServer.settings.donotShowInfoMsg": true,
    "liveServer.settings.donotVerifyTags": true,
    "security.workspace.trust.untrustedFiles": "open",
    "auto-rename-tag.activationOnLanguage": ["html"],
    "prettier.printWidth": 270,
    "prettier.tabWidth": 4,
    "prettier.singleQuote": true,
    "prettier.useTabs": true,
    "workbench.startupEditor": "none",
    "editor.wordWrap": "on"
}
```