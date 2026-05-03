/**
 * Dá»¯ liá»‡u prompt AI cho 50 Mini Tools Vibe
 * Má»—i prompt hÆ°á»›ng dáº«n AI táº¡o ra cÃ´ng cá»¥ mini tÆ°Æ¡ng á»©ng báº±ng HTML/CSS/JS thuáº§n.
 */
export const VIBE_PROMPTS = [
    {
        id: 1,
        toolName: 'Calculator',
        content: `HÃ£y táº¡o má»™t á»©ng dá»¥ng mÃ¡y tÃ­nh mini báº±ng HTML, CSS vÃ  JavaScript thuáº§n (khÃ´ng dÃ¹ng framework).

YÃªu cáº§u giao diá»‡n:
- Thiáº¿t káº¿ hiá»‡n Ä‘áº¡i, bo gÃ³c, mÃ u sáº¯c pastel (tÃ­m/xanh dÆ°Æ¡ng nháº¡t)
- MÃ n hÃ¬nh hiá»ƒn thá»‹ sá»‘ lá»›n, rÃµ rÃ ng
- CÃ¡c nÃºt báº¥m cÃ³ hiá»‡u á»©ng hover vÃ  active mÆ°á»£t mÃ 
- Responsive, hoáº¡t Ä‘á»™ng tá»‘t trÃªn mobile

YÃªu cáº§u chá»©c nÄƒng:
- CÃ¡c phÃ©p tÃ­nh cÆ¡ báº£n: cá»™ng (+), trá»« (-), nhÃ¢n (Ã—), chia (Ã·)
- NÃºt xÃ³a (C) vÃ  xÃ³a tá»«ng kÃ½ tá»± (âŒ«)
- Há»— trá»£ sá»‘ tháº­p phÃ¢n
- Hiá»ƒn thá»‹ lá»‹ch sá»­ phÃ©p tÃ­nh vá»«a thá»±c hiá»‡n
- Xá»­ lÃ½ lá»—i chia cho 0

Táº¥t cáº£ code trong má»™t file HTML duy nháº¥t, cÃ³ comment giáº£i thÃ­ch rÃµ rÃ ng.`,
    },
    {
        id: 2,
        toolName: 'Random Number',
        content: `HÃ£y táº¡o má»™t á»©ng dá»¥ng táº¡o sá»‘ ngáº«u nhiÃªn báº±ng HTML, CSS vÃ  JavaScript thuáº§n.

YÃªu cáº§u giao diá»‡n:
- Thiáº¿t káº¿ vui tÆ°Æ¡i, mÃ u há»“ng/Ä‘á» pastel
- Sá»‘ ngáº«u nhiÃªn hiá»ƒn thá»‹ to, ná»•i báº­t vá»›i hiá»‡u á»©ng animation khi xuáº¥t hiá»‡n
- CÃ³ Ã´ nháº­p min/max Ä‘á»ƒ tÃ¹y chá»‰nh khoáº£ng sá»‘
- NÃºt "Táº¡o sá»‘ má»›i" vá»›i hiá»‡u á»©ng shake/bounce

YÃªu cáº§u chá»©c nÄƒng:
- Táº¡o sá»‘ ngáº«u nhiÃªn trong khoáº£ng [min, max] do ngÆ°á»i dÃ¹ng nháº­p
- LÆ°u lá»‹ch sá»­ 10 sá»‘ gáº§n nháº¥t
- NÃºt copy sá»‘ vá»«a táº¡o
- Hiá»‡u á»©ng confetti nhá» khi táº¡o sá»‘
- Validate input (min < max, chá»‰ nháº­n sá»‘ nguyÃªn)

Táº¥t cáº£ code trong má»™t file HTML duy nháº¥t.`,
    },
    {
        id: 3,
        toolName: 'Random Emoji',
        content: `HÃ£y táº¡o má»™t á»©ng dá»¥ng táº¡o emoji ngáº«u nhiÃªn báº±ng HTML, CSS vÃ  JavaScript thuáº§n.

YÃªu cáº§u giao diá»‡n:
- Thiáº¿t káº¿ vui nhá»™n, mÃ u vÃ ng/cam pastel
- Emoji hiá»ƒn thá»‹ cá»±c to (font-size 120px) vá»›i animation bounce
- CÃ³ cÃ¡c danh má»¥c emoji: Cáº£m xÃºc, Äá»™ng váº­t, Thá»©c Äƒn, Du lá»‹ch, Hoáº¡t Ä‘á»™ng
- NÃºt "Shuffle" vá»›i hiá»‡u á»©ng xoay

YÃªu cáº§u chá»©c nÄƒng:
- Random 1 emoji tá»« danh má»¥c Ä‘Ã£ chá»n (hoáº·c táº¥t cáº£)
- Hiá»ƒn thá»‹ tÃªn emoji bÃªn dÆ°á»›i
- NÃºt copy emoji vÃ o clipboard
- Táº¡o bá»™ 5 emoji ngáº«u nhiÃªn cÃ¹ng lÃºc
- LÆ°u emoji yÃªu thÃ­ch (localStorage)

Táº¥t cáº£ code trong má»™t file HTML duy nháº¥t.`,
    },
    {
        id: 4,
        toolName: 'Dark Mode Toggle',
        content: `HÃ£y táº¡o má»™t demo chuyá»ƒn Ä‘á»•i Dark/Light mode báº±ng HTML, CSS vÃ  JavaScript thuáº§n.

YÃªu cáº§u giao diá»‡n:
- Toggle switch Ä‘áº¹p vá»›i icon máº·t trá»i â˜€ï¸ vÃ  máº·t trÄƒng ðŸŒ™
- Transition mÆ°á»£t mÃ  khi chuyá»ƒn Ä‘á»•i (0.3s ease)
- Demo content Ä‘áº§y Ä‘á»§: header, cards, text, buttons Ä‘á»ƒ tháº¥y rÃµ sá»± khÃ¡c biá»‡t
- MÃ u sáº¯c dark mode: ná»n #1a1a2e, text #e0e0e0

YÃªu cáº§u chá»©c nÄƒng:
- LÆ°u tráº¡ng thÃ¡i vÃ o localStorage
- Tá»± Ä‘á»™ng Ã¡p dá»¥ng theme Ä‘Ã£ lÆ°u khi load trang
- CSS variables Ä‘á»ƒ quáº£n lÃ½ mÃ u sáº¯c
- Há»— trá»£ prefers-color-scheme cá»§a há»‡ thá»‘ng

Táº¥t cáº£ code trong má»™t file HTML duy nháº¥t, cÃ³ comment giáº£i thÃ­ch CSS variables.`,
    },
    {
        id: 5,
        toolName: 'Button Sound',
        content: `HÃ£y táº¡o má»™t demo nÃºt báº¥m cÃ³ Ã¢m thanh báº±ng HTML, CSS vÃ  JavaScript thuáº§n (Web Audio API).

YÃªu cáº§u giao diá»‡n:
- Nhiá»u loáº¡i nÃºt vá»›i thiáº¿t káº¿ Ä‘áº¹p: Primary, Success, Warning, Danger
- Hiá»ƒn thá»‹ sÃ³ng Ã¢m animation khi báº¥m
- Volume slider Ä‘á»ƒ Ä‘iá»u chá»‰nh Ã¢m lÆ°á»£ng
- Toggle báº­t/táº¯t Ã¢m thanh

YÃªu cáº§u chá»©c nÄƒng:
- Táº¡o Ã¢m thanh báº±ng Web Audio API (khÃ´ng cáº§n file Ã¢m thanh ngoÃ i)
- Má»—i loáº¡i nÃºt cÃ³ Ã¢m thanh khÃ¡c nhau (táº§n sá»‘ khÃ¡c nhau)
- Hiá»‡u á»©ng ripple khi click
- Ã‚m thanh: click ngáº¯n, success (ascending), error (descending), warning (beep)

Táº¥t cáº£ code trong má»™t file HTML duy nháº¥t, giáº£i thÃ­ch cÃ¡ch Web Audio API hoáº¡t Ä‘á»™ng.`,
    },
    {
        id: 6,
        toolName: 'Text Preview',
        content: `HÃ£y táº¡o má»™t á»©ng dá»¥ng xem trÆ°á»›c vÄƒn báº£n real-time báº±ng HTML, CSS vÃ  JavaScript thuáº§n.

YÃªu cáº§u giao diá»‡n:
- Layout 2 cá»™t: bÃªn trÃ¡i lÃ  textarea nháº­p liá»‡u, bÃªn pháº£i lÃ  preview
- Thanh cÃ´ng cá»¥ Ä‘á»‹nh dáº¡ng: Bold, Italic, Underline, mÃ u chá»¯, cá»¡ chá»¯
- Font selector vá»›i cÃ¡c font phá»• biáº¿n
- NÃºt copy HTML output

YÃªu cáº§u chá»©c nÄƒng:
- Preview cáº­p nháº­t real-time khi gÃµ (debounce 100ms)
- Há»— trá»£ Markdown cÆ¡ báº£n: **bold**, *italic*, # heading, - list
- Äáº¿m sá»‘ tá»« vÃ  kÃ½ tá»± real-time
- Export preview ra file .txt hoáº·c .html
- LÆ°u ná»™i dung vÃ o localStorage tá»± Ä‘á»™ng

Táº¥t cáº£ code trong má»™t file HTML duy nháº¥t.`,
    },
    {
        id: 7,
        toolName: 'Text Size Slider',
        content: `HÃ£y táº¡o má»™t á»©ng dá»¥ng Ä‘iá»u chá»‰nh kÃ­ch thÆ°á»›c vÄƒn báº£n báº±ng HTML, CSS vÃ  JavaScript thuáº§n.

YÃªu cáº§u giao diá»‡n:
- Slider Ä‘áº¹p vá»›i gradient mÃ u cam/vÃ ng
- Hiá»ƒn thá»‹ kÃ­ch thÆ°á»›c hiá»‡n táº¡i (px vÃ  rem)
- VÃ¹ng preview text lá»›n, rÃµ rÃ ng
- CÃ¡c preset nhanh: Small (12px), Normal (16px), Large (24px), XL (32px), XXL (48px)

YÃªu cáº§u chá»©c nÄƒng:
- Slider range tá»« 8px Ä‘áº¿n 72px
- Thay Ä‘á»•i font-size real-time
- Äiá»u chá»‰nh line-height tá»± Ä‘á»™ng theo font-size
- Há»— trá»£ nhiá»u font family
- NÃºt reset vá» máº·c Ä‘á»‹nh
- LÆ°u cÃ i Ä‘áº·t vÃ o localStorage

Táº¥t cáº£ code trong má»™t file HTML duy nháº¥t.`,
    },
    {
        id: 8,
        toolName: 'Background Changer',
        content: `HÃ£y táº¡o má»™t á»©ng dá»¥ng thay Ä‘á»•i mÃ u ná»n báº±ng HTML, CSS vÃ  JavaScript thuáº§n.

YÃªu cáº§u giao diá»‡n:
- Color picker Ä‘áº¹p vá»›i palette mÃ u sáºµn cÃ³
- Preview toÃ n mÃ n hÃ¬nh vá»›i transition mÆ°á»£t mÃ 
- Gradient generator: chá»n 2-3 mÃ u vÃ  hÆ°á»›ng gradient
- Hiá»ƒn thá»‹ mÃ£ mÃ u HEX, RGB, HSL

YÃªu cáº§u chá»©c nÄƒng:
- Chá»n mÃ u Ä‘Æ¡n hoáº·c gradient
- 20+ mÃ u preset Ä‘áº¹p
- Random mÃ u ngáº«u nhiÃªn
- Copy mÃ£ mÃ u/CSS vÃ o clipboard
- LÆ°u mÃ u yÃªu thÃ­ch (tá»‘i Ä‘a 10 mÃ u)
- Export CSS gradient code

Táº¥t cáº£ code trong má»™t file HTML duy nháº¥t.`,
    },
    {
        id: 9,
        toolName: 'Click Counter',
        content: `HÃ£y táº¡o má»™t á»©ng dá»¥ng Ä‘áº¿m sá»‘ láº§n click báº±ng HTML, CSS vÃ  JavaScript thuáº§n.

YÃªu cáº§u giao diá»‡n:
- Sá»‘ Ä‘áº¿m hiá»ƒn thá»‹ cá»±c to, ná»•i báº­t
- NÃºt click lá»›n vá»›i hiá»‡u á»©ng ripple vÃ  bounce
- Thanh progress bar hiá»ƒn thá»‹ tiáº¿n Ä‘á»™ Ä‘áº¿n má»¥c tiÃªu
- MÃ u sáº¯c thay Ä‘á»•i theo má»‘c: xanh â†’ vÃ ng â†’ Ä‘á»

YÃªu cáº§u chá»©c nÄƒng:
- Äáº¿m sá»‘ láº§n click, double-click, right-click riÃªng biá»‡t
- Äáº·t má»¥c tiÃªu (goal) vÃ  thÃ´ng bÃ¡o khi Ä‘áº¡t
- Tá»‘c Ä‘á»™ click (clicks/giÃ¢y) real-time
- NÃºt reset vá»›i confirm dialog
- LÆ°u ká»· lá»¥c cao nháº¥t vÃ o localStorage
- Cháº¿ Ä‘á»™ Ä‘áº¿m ngÆ°á»£c (countdown)

Táº¥t cáº£ code trong má»™t file HTML duy nháº¥t.`,
    },
    {
        id: 10,
        toolName: 'Theme Picker',
        content: `HÃ£y táº¡o má»™t á»©ng dá»¥ng chá»n theme giao diá»‡n báº±ng HTML, CSS vÃ  JavaScript thuáº§n.

YÃªu cáº§u giao diá»‡n:
- Grid cÃ¡c theme card vá»›i preview mÃ u sáº¯c
- Demo UI Ä‘áº§y Ä‘á»§: navbar, cards, buttons, form Ä‘á»ƒ xem trÆ°á»›c theme
- Transition mÆ°á»£t mÃ  khi Ä‘á»•i theme
- Badge "Active" trÃªn theme Ä‘ang dÃ¹ng

YÃªu cáº§u chá»©c nÄƒng:
- Ãt nháº¥t 8 theme: Default, Ocean, Forest, Sunset, Candy, Midnight, Rose, Mint
- Má»—i theme cÃ³: primary color, secondary, background, text, accent
- LÆ°u theme Ä‘Ã£ chá»n vÃ o localStorage
- Táº¡o theme tÃ¹y chá»‰nh (custom theme builder)
- Export theme dÆ°á»›i dáº¡ng CSS variables

Táº¥t cáº£ code trong má»™t file HTML duy nháº¥t, sá»­ dá»¥ng CSS custom properties.`,
    },
    {
        id: 11,
        toolName: 'Character Counter',
        content: `HÃ£y táº¡o má»™t á»©ng dá»¥ng Ä‘áº¿m kÃ½ tá»± vÄƒn báº£n báº±ng HTML, CSS vÃ  JavaScript thuáº§n.

YÃªu cáº§u giao diá»‡n:
- Textarea lá»›n, dá»… nhÃ¬n vá»›i placeholder hÆ°á»›ng dáº«n
- Dashboard thá»‘ng kÃª: tá»•ng kÃ½ tá»±, kÃ½ tá»± khÃ´ng khoáº£ng tráº¯ng, tá»«, cÃ¢u, Ä‘oáº¡n
- Progress bar hiá»ƒn thá»‹ % so vá»›i giá»›i háº¡n
- MÃ u cáº£nh bÃ¡o khi gáº§n Ä‘áº¡t giá»›i háº¡n

YÃªu cáº§u chá»©c nÄƒng:
- Äáº¿m real-time: kÃ½ tá»±, tá»«, cÃ¢u, Ä‘oáº¡n vÄƒn
- Äáº·t giá»›i háº¡n kÃ½ tá»± tÃ¹y chá»‰nh (Twitter: 280, SMS: 160, v.v.)
- PhÃ¢n tÃ­ch táº§n suáº¥t tá»« (top 10 tá»« xuáº¥t hiá»‡n nhiá»u nháº¥t)
- Æ¯á»›c tÃ­nh thá»i gian Ä‘á»c
- Highlight tá»« trÃ¹ng láº·p

Táº¥t cáº£ code trong má»™t file HTML duy nháº¥t.`,
    },
    {
        id: 12,
        toolName: 'Word Counter',
        content: `HÃ£y táº¡o má»™t á»©ng dá»¥ng Ä‘áº¿m tá»« chuyÃªn nghiá»‡p báº±ng HTML, CSS vÃ  JavaScript thuáº§n.

YÃªu cáº§u giao diá»‡n:
- Editor textarea vá»›i line numbers
- Sidebar thá»‘ng kÃª chi tiáº¿t
- Biá»ƒu Ä‘á»“ phÃ¢n bá»‘ Ä‘á»™ dÃ i tá»« (bar chart Ä‘Æ¡n giáº£n báº±ng CSS)
- Highlight tá»« khi hover vÃ o thá»‘ng kÃª

YÃªu cáº§u chá»©c nÄƒng:
- Äáº¿m: tá»«, kÃ½ tá»±, cÃ¢u, Ä‘oáº¡n, dÃ²ng
- Thá»‘ng kÃª tá»«: tá»« ngáº¯n nháº¥t, dÃ i nháº¥t, trung bÃ¬nh
- Top 10 tá»« xuáº¥t hiá»‡n nhiá»u nháº¥t (loáº¡i bá» stop words)
- Æ¯á»›c tÃ­nh thá»i gian Ä‘á»c (200 tá»«/phÃºt)
- Æ¯á»›c tÃ­nh thá»i gian nÃ³i (130 tá»«/phÃºt)
- Export bÃ¡o cÃ¡o thá»‘ng kÃª

Táº¥t cáº£ code trong má»™t file HTML duy nháº¥t.`,
    },
    {
        id: 13,
        toolName: 'Text Case Converter',
        content: `HÃ£y táº¡o má»™t á»©ng dá»¥ng chuyá»ƒn Ä‘á»•i kiá»ƒu chá»¯ báº±ng HTML, CSS vÃ  JavaScript thuáº§n.

YÃªu cáº§u giao diá»‡n:
- Textarea nháº­p liá»‡u vÃ  output riÃªng biá»‡t
- CÃ¡c nÃºt chuyá»ƒn Ä‘á»•i vá»›i icon minh há»a
- Preview real-time khi chá»n kiá»ƒu
- NÃºt copy output nhanh

YÃªu cáº§u chá»©c nÄƒng:
- UPPERCASE: Táº¤T Cáº¢ CHá»® HOA
- lowercase: táº¥t cáº£ chá»¯ thÆ°á»ng
- Title Case: Viáº¿t Hoa Äáº§u Má»—i Tá»«
- Sentence case: Viáº¿t hoa Ä‘áº§u cÃ¢u
- camelCase: viáº¿tHoaChá»¯Äáº§uTá»«SauChá»¯Äáº§u
- PascalCase: Viáº¿tHoaTáº¥tCáº£Chá»¯Äáº§uTá»«
- snake_case: viáº¿t_thÆ°á»ng_ngÄƒn_cÃ¡ch_gáº¡ch_dÆ°á»›i
- kebab-case: viáº¿t-thÆ°á»ng-ngÄƒn-cÃ¡ch-gáº¡ch-ngang
- Há»— trá»£ tiáº¿ng Viá»‡t cÃ³ dáº¥u

Táº¥t cáº£ code trong má»™t file HTML duy nháº¥t.`,
    },
    {
        id: 14,
        toolName: 'Text Trimmer',
        content: `HÃ£y táº¡o má»™t á»©ng dá»¥ng xá»­ lÃ½ khoáº£ng tráº¯ng vÄƒn báº£n báº±ng HTML, CSS vÃ  JavaScript thuáº§n.

YÃªu cáº§u giao diá»‡n:
- Layout 2 cá»™t: input vÃ  output song song
- Highlight cÃ¡c khoáº£ng tráº¯ng thá»«a báº±ng mÃ u Ä‘á» nháº¡t trÆ°á»›c khi xÃ³a
- Thá»‘ng kÃª: sá»‘ kÃ½ tá»± Ä‘Ã£ xÃ³a, % giáº£m
- CÃ¡c tÃ¹y chá»n dáº¡ng checkbox

YÃªu cáº§u chá»©c nÄƒng:
- XÃ³a khoáº£ng tráº¯ng Ä‘áº§u/cuá»‘i (trim)
- XÃ³a khoáº£ng tráº¯ng thá»«a giá»¯a cÃ¡c tá»« (normalize)
- XÃ³a dÃ²ng trá»‘ng thá»«a
- XÃ³a tab, thay báº±ng spaces
- XÃ³a kÃ½ tá»± Ä‘áº·c biá»‡t tÃ¹y chá»n
- Chuáº©n hÃ³a dáº¥u cÃ¢u (khoáº£ng tráº¯ng sau dáº¥u pháº©y, cháº¥m)
- Xá»­ lÃ½ real-time hoáº·c theo nÃºt báº¥m

Táº¥t cáº£ code trong má»™t file HTML duy nháº¥t.`,
    },
    {
        id: 15,
        toolName: 'Text Reverser',
        content: `HÃ£y táº¡o má»™t á»©ng dá»¥ng Ä‘áº£o ngÆ°á»£c vÄƒn báº£n báº±ng HTML, CSS vÃ  JavaScript thuáº§n.

YÃªu cáº§u giao diá»‡n:
- Animation chá»¯ cháº¡y ngÆ°á»£c khi Ä‘áº£o
- Layout 2 cá»™t vá»›i mÅ©i tÃªn â†” á»Ÿ giá»¯a
- NÃºt swap Ä‘á»ƒ hoÃ¡n Ä‘á»•i input/output
- Hiá»‡u á»©ng typing animation cho output

YÃªu cáº§u chá»©c nÄƒng:
- Äáº£o ngÆ°á»£c toÃ n bá»™ chuá»—i kÃ½ tá»±
- Äáº£o ngÆ°á»£c thá»© tá»± tá»« (giá»¯ nguyÃªn tá»«ng tá»«)
- Äáº£o ngÆ°á»£c tá»«ng dÃ²ng
- Äáº£o ngÆ°á»£c thá»© tá»± cÃ¢u
- Äáº£o ngÆ°á»£c vÃ  giá»¯ nguyÃªn dáº¥u cÃ¢u á»Ÿ vá»‹ trÃ­ gá»‘c
- Há»— trá»£ Unicode vÃ  emoji
- Copy káº¿t quáº£ nhanh

Táº¥t cáº£ code trong má»™t file HTML duy nháº¥t.`,
    },
    {
        id: 16,
        toolName: 'To-Do List',
        content: `HÃ£y táº¡o má»™t á»©ng dá»¥ng To-Do List Ä‘áº¹p báº±ng HTML, CSS vÃ  JavaScript thuáº§n.

YÃªu cáº§u giao diá»‡n:
- Thiáº¿t káº¿ card-based, mÃ u sáº¯c tÆ°Æ¡i sÃ¡ng
- Animation khi thÃªm/xÃ³a task (slide in/out)
- Checkbox tÃ¹y chá»‰nh vá»›i animation tick
- Drag & drop Ä‘á»ƒ sáº¯p xáº¿p thá»© tá»± task

YÃªu cáº§u chá»©c nÄƒng:
- ThÃªm, sá»­a, xÃ³a task
- ÄÃ¡nh dáº¥u hoÃ n thÃ nh vá»›i animation gáº¡ch ngang
- PhÃ¢n loáº¡i: Táº¥t cáº£, Äang lÃ m, HoÃ n thÃ nh
- Äáº·t Ä‘á»™ Æ°u tiÃªn: Cao, Trung bÃ¬nh, Tháº¥p (mÃ u sáº¯c khÃ¡c nhau)
- Äáº·t deadline vÃ  cáº£nh bÃ¡o quÃ¡ háº¡n
- LÆ°u vÃ o localStorage
- Thá»‘ng kÃª: tá»•ng task, hoÃ n thÃ nh, cÃ²n láº¡i

Táº¥t cáº£ code trong má»™t file HTML duy nháº¥t.`,
    },
    {
        id: 17,
        toolName: 'Sticky Notes',
        content: `HÃ£y táº¡o má»™t á»©ng dá»¥ng ghi chÃº sticky notes báº±ng HTML, CSS vÃ  JavaScript thuáº§n.

YÃªu cáº§u giao diá»‡n:
- Sticky notes mÃ u vÃ ng/xanh/há»“ng/tÃ­m cÃ³ thá»ƒ kÃ©o tháº£ tá»± do
- Hiá»‡u á»©ng giáº¥y nhÄƒn nháº¹ (box-shadow, slight rotation)
- NÃºt thÃªm note má»›i vá»›i animation pop-in
- NÃºt xÃ³a note vá»›i animation fade-out

YÃªu cáº§u chá»©c nÄƒng:
- Táº¡o note má»›i vá»›i mÃ u tÃ¹y chá»n
- KÃ©o tháº£ note Ä‘áº¿n vá»‹ trÃ­ báº¥t ká»³ trÃªn mÃ n hÃ¬nh
- Chá»‰nh sá»­a ná»™i dung trá»±c tiáº¿p (contenteditable)
- Resize note
- Pin note (ghim cá»‘ Ä‘á»‹nh)
- LÆ°u vá»‹ trÃ­ vÃ  ná»™i dung vÃ o localStorage
- TÃ¬m kiáº¿m trong cÃ¡c note

Táº¥t cáº£ code trong má»™t file HTML duy nháº¥t.`,
    },
    {
        id: 18,
        toolName: 'Countdown Timer',
        content: `HÃ£y táº¡o má»™t á»©ng dá»¥ng Ä‘áº¿m ngÆ°á»£c thá»i gian báº±ng HTML, CSS vÃ  JavaScript thuáº§n.

YÃªu cáº§u giao diá»‡n:
- Hiá»ƒn thá»‹ giá»:phÃºt:giÃ¢y dáº¡ng flip clock hoáº·c digital lá»›n
- Circular progress bar xung quanh Ä‘á»“ng há»“
- MÃ u sáº¯c thay Ä‘á»•i khi cÃ²n Ã­t thá»i gian (xanh â†’ vÃ ng â†’ Ä‘á»)
- NÃºt Start/Pause/Reset vá»›i icon Ä‘áº¹p

YÃªu cáº§u chá»©c nÄƒng:
- Nháº­p thá»i gian tÃ¹y chá»‰nh (giá», phÃºt, giÃ¢y)
- Preset nhanh: 1 phÃºt, 5 phÃºt, 10 phÃºt, 25 phÃºt, 1 giá»
- Ã‚m thanh cáº£nh bÃ¡o khi háº¿t giá» (Web Audio API)
- ThÃ´ng bÃ¡o browser notification
- Láº·p láº¡i tá»± Ä‘á»™ng (loop mode)
- LÆ°u preset tÃ¹y chá»‰nh

Táº¥t cáº£ code trong má»™t file HTML duy nháº¥t.`,
    },
    {
        id: 19,
        toolName: 'Pomodoro Timer',
        content: `HÃ£y táº¡o má»™t á»©ng dá»¥ng Pomodoro Timer báº±ng HTML, CSS vÃ  JavaScript thuáº§n.

YÃªu cáº§u giao diá»‡n:
- Thiáº¿t káº¿ tomato/cÃ  chua Ä‘Ã¡ng yÃªu ðŸ…
- VÃ²ng trÃ²n progress lá»›n, rÃµ rÃ ng
- PhÃ¢n biá»‡t rÃµ 3 cháº¿ Ä‘á»™: Work (Ä‘á»), Short Break (xanh), Long Break (xanh dÆ°Æ¡ng)
- Danh sÃ¡ch task tÃ­ch há»£p Ä‘á»ƒ theo dÃµi Ä‘ang lÃ m gÃ¬

YÃªu cáº§u chá»©c nÄƒng:
- Chu ká»³ Pomodoro chuáº©n: 25 phÃºt lÃ m viá»‡c, 5 phÃºt nghá»‰ ngáº¯n, 15 phÃºt nghá»‰ dÃ i
- TÃ¹y chá»‰nh thá»i gian tá»«ng giai Ä‘oáº¡n
- Tá»± Ä‘á»™ng chuyá»ƒn giai Ä‘oáº¡n
- Äáº¿m sá»‘ pomodoro Ä‘Ã£ hoÃ n thÃ nh hÃ´m nay
- Ã‚m thanh chuÃ´ng khi chuyá»ƒn giai Ä‘oáº¡n
- Thá»‘ng kÃª: tá»•ng thá»i gian táº­p trung, sá»‘ pomodoro/ngÃ y
- LÆ°u dá»¯ liá»‡u vÃ o localStorage

Táº¥t cáº£ code trong má»™t file HTML duy nháº¥t.`,
    },
    {
        id: 20,
        toolName: 'Password Generator',
        content: `HÃ£y táº¡o má»™t á»©ng dá»¥ng táº¡o máº­t kháº©u máº¡nh báº±ng HTML, CSS vÃ  JavaScript thuáº§n.

YÃªu cáº§u giao diá»‡n:
- Hiá»ƒn thá»‹ máº­t kháº©u lá»›n, rÃµ rÃ ng vá»›i font monospace
- Thanh Ä‘Ã¡nh giÃ¡ Ä‘á»™ máº¡nh (Weak/Fair/Strong/Very Strong) vá»›i mÃ u sáº¯c
- CÃ¡c checkbox tÃ¹y chá»n kÃ½ tá»± Ä‘áº¹p
- NÃºt copy vá»›i animation "Copied!"

YÃªu cáº§u chá»©c nÄƒng:
- Äá»™ dÃ i tá»« 4 Ä‘áº¿n 128 kÃ½ tá»± (slider)
- TÃ¹y chá»n: chá»¯ hoa, chá»¯ thÆ°á»ng, sá»‘, kÃ½ tá»± Ä‘áº·c biá»‡t
- Loáº¡i trá»« kÃ½ tá»± dá»… nháº§m: 0, O, l, 1, I
- Táº¡o nhiá»u máº­t kháº©u cÃ¹ng lÃºc (batch generate)
- ÄÃ¡nh giÃ¡ Ä‘á»™ máº¡nh theo entropy
- Lá»‹ch sá»­ 10 máº­t kháº©u gáº§n nháº¥t (khÃ´ng lÆ°u localStorage vÃ¬ báº£o máº­t)
- Kiá»ƒm tra máº­t kháº©u cÃ³ trong danh sÃ¡ch phá»• biáº¿n khÃ´ng

Táº¥t cáº£ code trong má»™t file HTML duy nháº¥t.`,
    },
    {
        id: 21,
        toolName: 'Color Picker',
        content: `HÃ£y táº¡o má»™t á»©ng dá»¥ng chá»n mÃ u sáº¯c chuyÃªn nghiá»‡p báº±ng HTML, CSS vÃ  JavaScript thuáº§n.

YÃªu cáº§u giao diá»‡n:
- Color wheel hoáº·c gradient picker Ä‘áº¹p
- Preview mÃ u lá»›n vá»›i text máº«u Ä‘á»ƒ kiá»ƒm tra contrast
- Palette mÃ u Ä‘Ã£ lÆ°u dáº¡ng swatches
- Hiá»ƒn thá»‹ Ä‘á»“ng thá»i HEX, RGB, HSL, HSB

YÃªu cáº§u chá»©c nÄƒng:
- Chá»n mÃ u báº±ng color wheel + lightness slider
- Nháº­p trá»±c tiáº¿p mÃ£ HEX/RGB/HSL
- Tá»± Ä‘á»™ng chuyá»ƒn Ä‘á»•i giá»¯a cÃ¡c format
- Kiá»ƒm tra contrast ratio (WCAG AA/AAA)
- Táº¡o color palette hÃ i hÃ²a: complementary, triadic, analogous
- LÆ°u mÃ u yÃªu thÃ­ch (localStorage)
- Copy mÃ£ mÃ u theo format tÃ¹y chá»n

Táº¥t cáº£ code trong má»™t file HTML duy nháº¥t.`,
    },
    {
        id: 22,
        toolName: 'Unit Converter',
        content: `HÃ£y táº¡o má»™t á»©ng dá»¥ng chuyá»ƒn Ä‘á»•i Ä‘Æ¡n vá»‹ báº±ng HTML, CSS vÃ  JavaScript thuáº§n.

YÃªu cáº§u giao diá»‡n:
- Tabs cho tá»«ng loáº¡i Ä‘Æ¡n vá»‹ vá»›i icon
- Layout 2 cá»™t: nháº­p vÃ o bÃªn trÃ¡i, káº¿t quáº£ bÃªn pháº£i
- Káº¿t quáº£ cáº­p nháº­t real-time khi gÃµ
- NÃºt swap Ä‘á»ƒ Ä‘á»•i chiá»u chuyá»ƒn Ä‘á»•i

YÃªu cáº§u chá»©c nÄƒng:
- Äá»™ dÃ i: mm, cm, m, km, inch, feet, yard, mile
- Khá»‘i lÆ°á»£ng: mg, g, kg, táº¥n, ounce, pound
- Nhiá»‡t Ä‘á»™: Celsius, Fahrenheit, Kelvin
- Diá»‡n tÃ­ch: cmÂ², mÂ², kmÂ², inchÂ², feetÂ², acre, hectare
- Thá»ƒ tÃ­ch: ml, l, mÂ³, teaspoon, tablespoon, cup, gallon
- Tá»‘c Ä‘á»™: m/s, km/h, mph, knot
- Hiá»ƒn thá»‹ cÃ´ng thá»©c chuyá»ƒn Ä‘á»•i

Táº¥t cáº£ code trong má»™t file HTML duy nháº¥t.`,
    },
    {
        id: 23,
        toolName: 'Date & Time',
        content: `HÃ£y táº¡o má»™t á»©ng dá»¥ng hiá»ƒn thá»‹ ngÃ y giá» Ä‘áº¹p báº±ng HTML, CSS vÃ  JavaScript thuáº§n.

YÃªu cáº§u giao diá»‡n:
- Äá»“ng há»“ analog Ä‘áº¹p vá»›i kim giá», phÃºt, giÃ¢y mÆ°á»£t mÃ 
- Äá»“ng há»“ digital lá»›n bÃªn cáº¡nh
- Hiá»ƒn thá»‹ ngÃ y thÃ¡ng nÄƒm, thá»© trong tuáº§n
- MÃºi giá» cá»§a nhiá»u thÃ nh phá»‘ lá»›n

YÃªu cáº§u chá»©c nÄƒng:
- Cáº­p nháº­t real-time má»—i giÃ¢y
- Hiá»ƒn thá»‹ giá» theo 12h vÃ  24h
- Chuyá»ƒn Ä‘á»•i mÃºi giá»: HÃ  Ná»™i, Tokyo, London, New York, Sydney
- TÃ­nh sá»‘ ngÃ y Ä‘áº¿n sá»± kiá»‡n (countdown Ä‘áº¿n Táº¿t, sinh nháº­t...)
- Hiá»ƒn thá»‹ tuáº§n thá»© máº¥y trong nÄƒm
- NgÃ y Julian vÃ  Unix timestamp

Táº¥t cáº£ code trong má»™t file HTML duy nháº¥t, sá»­ dá»¥ng Intl API.`,
    },
    {
        id: 24,
        toolName: 'Stopwatch',
        content: `HÃ£y táº¡o má»™t á»©ng dá»¥ng Ä‘á»“ng há»“ báº¥m giá» báº±ng HTML, CSS vÃ  JavaScript thuáº§n.

YÃªu cáº§u giao diá»‡n:
- Hiá»ƒn thá»‹ giá»:phÃºt:giÃ¢y.mili-giÃ¢y vá»›i font monospace lá»›n
- NÃºt Start/Stop/Reset/Lap vá»›i icon vÃ  mÃ u sáº¯c phÃ¢n biá»‡t
- Danh sÃ¡ch lap times vá»›i highlight lap nhanh nháº¥t/cháº­m nháº¥t
- Animation nháº¥p nhÃ¡y khi Ä‘ang cháº¡y

YÃªu cáº§u chá»©c nÄƒng:
- Äá»™ chÃ­nh xÃ¡c Ä‘áº¿n mili-giÃ¢y (requestAnimationFrame)
- Ghi láº¡i lap time vá»›i nÃºt Lap
- So sÃ¡nh lap: highlight xanh (nhanh nháº¥t), Ä‘á» (cháº­m nháº¥t)
- TÃ­nh thá»i gian trung bÃ¬nh cÃ¡c lap
- Export danh sÃ¡ch lap ra CSV
- LÆ°u káº¿t quáº£ vÃ o localStorage

Táº¥t cáº£ code trong má»™t file HTML duy nháº¥t.`,
    },
    {
        id: 25,
        toolName: 'Alarm Clock',
        content: `HÃ£y táº¡o má»™t á»©ng dá»¥ng bÃ¡o thá»©c báº±ng HTML, CSS vÃ  JavaScript thuáº§n.

YÃªu cáº§u giao diá»‡n:
- Äá»“ng há»“ digital lá»›n hiá»ƒn thá»‹ giá» hiá»‡n táº¡i
- Form Ä‘áº·t bÃ¡o thá»©c Ä‘áº¹p vá»›i time picker
- Danh sÃ¡ch bÃ¡o thá»©c vá»›i toggle báº­t/táº¯t
- Animation rung khi bÃ¡o thá»©c kÃªu

YÃªu cáº§u chá»©c nÄƒng:
- Äáº·t nhiá»u bÃ¡o thá»©c cÃ¹ng lÃºc
- Chá»n ngÃ y láº·p láº¡i: hÃ ng ngÃ y, cÃ¡c ngÃ y trong tuáº§n, cuá»‘i tuáº§n
- Ã‚m thanh bÃ¡o thá»©c báº±ng Web Audio API (nhiá»u loáº¡i Ã¢m thanh)
- Snooze 5/10 phÃºt
- Label cho tá»«ng bÃ¡o thá»©c
- ThÃ´ng bÃ¡o browser notification
- LÆ°u táº¥t cáº£ bÃ¡o thá»©c vÃ o localStorage

Táº¥t cáº£ code trong má»™t file HTML duy nháº¥t.`,
    },
    {
        id: 26,
        toolName: 'Tip Calculator',
        content: "Hay tao mot ung dung tinh tien tip nha hang bang HTML, CSS va JavaScript thuan.\n\nYeu cau giao dien:\n- Thiet ke hien dai, mau xanh la/emerald\n- Nhap so tien hoa don, chon % tip (10/15/18/20/25 hoac tu nhap)\n- Hien thi tien tip va tong tien lon, ro rang\n- Ho tro chia hoa don cho nhieu nguoi\n\nYeu cau chuc nang:\n- Tinh tip theo % hoac so tien co dinh\n- Chia deu cho N nguoi (moi nguoi tra bao nhieu)\n- Lam tron len/xuong tuy chon\n- Luu lich su 5 lan tinh gan nhat\n- Reset nhanh\n\nTat ca code trong mot file HTML duy nhat.",
    },
    {
        id: 27,
        toolName: 'BMI Calculator',
        content: "Hay tao mot ung dung tinh chi so BMI bang HTML, CSS va JavaScript thuan.\n\nYeu cau giao dien:\n- Thiet ke y te, sach se, mau xanh duong/cyan\n- Nhap chieu cao (cm hoac feet/inch) va can nang (kg hoac lbs)\n- Hien thi BMI lon, ro rang voi mau sac theo muc do\n- Thanh gauge/meter truc quan\n\nYeu cau chuc nang:\n- Tinh BMI theo cong thuc chuan\n- Phan loai: Thieu can / Binh thuong / Thua can / Beo phi\n- Ho tro ca don vi metric va imperial\n- Hien thi can nang ly tuong theo chieu cao\n- Luu lich su do\n\nTat ca code trong mot file HTML duy nhat.",
    },
    {
        id: 28,
        toolName: 'Age Calculator',
        content: "Hay tao mot ung dung tinh tuoi chinh xac bang HTML, CSS va JavaScript thuan.\n\nYeu cau giao dien:\n- Thiet ke vui tuoi, mau hong/rose\n- Date picker dep cho ngay sinh\n- Hien thi tuoi theo nam, thang, ngay, gio, phut, giay\n- Dem nguoc den sinh nhat tiep theo\n\nYeu cau chuc nang:\n- Tinh tuoi chinh xac den tung giay\n- Hien thi ngay sinh la thu may trong tuan\n- Tinh so ngay da song\n- Tinh so nhip tim da dap (uoc tinh)\n- So sanh tuoi voi cac su kien lich su\n\nTat ca code trong mot file HTML duy nhat.",
    },
    {
        id: 29,
        toolName: 'Loan Calculator',
        content: "Hay tao mot ung dung tinh lai suat vay bang HTML, CSS va JavaScript thuan.\n\nYeu cau giao dien:\n- Thiet ke chuyen nghiep, mau xam/slate\n- Nhap so tien vay, lai suat/nam, thoi han vay\n- Hien thi ket qua ro rang: tien tra hang thang, tong lai, tong tien tra\n- Bieu do pie chart don gian (CSS)\n\nYeu cau chuc nang:\n- Tinh theo phuong phap giam dan du no\n- Hien thi bang lich tra no chi tiet (amortization table)\n- So sanh 2-3 kich ban vay khac nhau\n- Tinh toan khi tra them hang thang\n- Export bang tinh ra CSV\n\nTat ca code trong mot file HTML duy nhat.",
    },
    {
        id: 30,
        toolName: 'Currency Converter',
        content: "Hay tao mot ung dung quy doi tien te bang HTML, CSS va JavaScript thuan.\n\nYeu cau giao dien:\n- Thiet ke hien dai, mau vang/orange\n- Dropdown chon dong tien voi co quoc gia\n- Nhap so tien, hien thi ket qua real-time\n- Nut swap de doi chieu quy doi\n\nYeu cau chuc nang:\n- Ho tro 20+ dong tien pho bien (USD, EUR, VND, JPY, GBP, CNY...)\n- Su dung ty gia co dinh (hardcode ty gia mau, ghi chu can cap nhat)\n- Quy doi 1 dong tien sang nhieu dong tien cung luc\n- Lich su quy doi\n- Hien thi bien dong ty gia (mock data)\n\nTat ca code trong mot file HTML duy nhat.",
    },
    {
        id: 31,
        toolName: 'QR Code Generator',
        content: "Hay tao mot ung dung tao ma QR bang HTML, CSS va JavaScript thuan (dung thu vien qrcode.js qua CDN).\n\nYeu cau giao dien:\n- Thiet ke toi gian, mau den/trang\n- Textarea nhap noi dung (text, URL, so dien thoai, email)\n- Hien thi QR code lon, ro net\n- Tuy chon mau sac QR\n\nYeu cau chuc nang:\n- Tao QR tu text, URL, so dien thoai, WiFi, vCard\n- Tuy chinh kich thuoc (100px - 400px)\n- Tuy chinh mau foreground va background\n- Tai QR ve dang PNG\n- Copy QR vao clipboard\n\nTat ca code trong mot file HTML duy nhat.",
    },
    {
        id: 32,
        toolName: 'Base64 Encoder',
        content: "Hay tao mot ung dung ma hoa Base64 bang HTML, CSS va JavaScript thuan.\n\nYeu cau giao dien:\n- Layout 2 cot: input va output song song\n- Nut Encode va Decode ro rang\n- Hien thi kich thuoc truoc/sau ma hoa\n- Highlight loi neu input khong hop le\n\nYeu cau chuc nang:\n- Encode text sang Base64\n- Decode Base64 ve text\n- Ho tro encode/decode file (FileReader API)\n- Encode URL-safe Base64\n- Hien thi hex dump cua du lieu\n- Copy ket qua nhanh\n\nTat ca code trong mot file HTML duy nhat.",
    },
    {
        id: 33,
        toolName: 'URL Encoder',
        content: "Hay tao mot ung dung encode/decode URL bang HTML, CSS va JavaScript thuan.\n\nYeu cau giao dien:\n- Layout 2 cot ro rang\n- Highlight cac ky tu duoc encode bang mau sac\n- Hien thi so ky tu truoc/sau\n- Nut copy nhanh\n\nYeu cau chuc nang:\n- encodeURIComponent va decodeURIComponent\n- encodeURI va decodeURI\n- Phan tich URL thanh cac phan: protocol, host, path, query, hash\n- Xay dung URL tu cac phan\n- Encode/decode query string\n- Hien thi bang ky tu dac biet va ma tuong ung\n\nTat ca code trong mot file HTML duy nhat.",
    },
    {
        id: 34,
        toolName: 'JSON Formatter',
        content: "Hay tao mot ung dung format JSON bang HTML, CSS va JavaScript thuan.\n\nYeu cau giao dien:\n- Editor voi syntax highlighting don gian (mau sac cho key, value, string, number)\n- Nut Format, Minify, Validate\n- Hien thi loi cu the neu JSON khong hop le\n- So dong va highlight dong loi\n\nYeu cau chuc nang:\n- Format JSON dep voi indent tuy chon (2/4 spaces hoac tab)\n- Minify JSON (xoa khoang trang)\n- Validate va hien thi loi chi tiet\n- Chuyen JSON sang cac dinh dang: CSV, XML, YAML (don gian)\n- Sap xep key theo alphabet\n- Copy ket qua\n\nTat ca code trong mot file HTML duy nhat.",
    },
    {
        id: 35,
        toolName: 'Markdown Preview',
        content: "Hay tao mot ung dung xem truoc Markdown bang HTML, CSS va JavaScript thuan (dung marked.js qua CDN).\n\nYeu cau giao dien:\n- Layout 2 cot: editor ben trai, preview ben phai\n- Toolbar cac nut dinh dang: Bold, Italic, Heading, Link, Image, Code, List\n- Syntax highlighting cho code blocks (dung highlight.js CDN)\n- Toggle xem toan man hinh\n\nYeu cau chuc nang:\n- Preview cap nhat real-time\n- Ho tro day du cu phap Markdown: heading, bold, italic, link, image, code, table, blockquote\n- Export ra file .md hoac .html\n- Dem tu va ky tu\n- Luu noi dung vao localStorage\n\nTat ca code trong mot file HTML duy nhat.",
    },
    {
        id: 36,
        toolName: 'Regex Tester',
        content: "Hay tao mot ung dung kiem tra bieu thuc chinh quy (Regex) bang HTML, CSS va JavaScript thuan.\n\nYeu cau giao dien:\n- O nhap regex voi cac flag (g, i, m, s)\n- Textarea nhap text de test\n- Highlight tat ca cac match bang mau vang\n- Hien thi danh sach cac match va capture groups\n\nYeu cau chuc nang:\n- Test regex real-time khi go\n- Hien thi so luong match\n- Hien thi capture groups (group 1, 2, 3...)\n- Chuc nang Replace: nhap chuoi thay the, hien thi ket qua\n- Thu vien regex mau: email, so dien thoai, URL, ngay thang...\n- Giai thich regex (mo ta tung phan)\n\nTat ca code trong mot file HTML duy nhat.",
    },
    {
        id: 37,
        toolName: 'Lorem Generator',
        content: "Hay tao mot ung dung tao van ban Lorem Ipsum bang HTML, CSS va JavaScript thuan.\n\nYeu cau giao dien:\n- Thiet ke sach se, mau tim nhat\n- Chon so luong: tu, cau, doan van\n- Nut Generate lon, noi bat\n- Ket qua hien thi dep voi font chu chu\n\nYeu cau chuc nang:\n- Tao Lorem Ipsum theo so tu/cau/doan tuy chon\n- Tao van ban tieng Viet ngau nhien (dung tu vung don gian)\n- Tao ten nguoi Viet ngau nhien\n- Tao dia chi Viet Nam ngau nhien\n- Tao so dien thoai, email ngau nhien (format hop le)\n- Copy ket qua nhanh\n\nTat ca code trong mot file HTML duy nhat.",
    },
    {
        id: 38,
        toolName: 'Gradient Generator',
        content: "Hay tao mot ung dung tao mau gradient bang HTML, CSS va JavaScript thuan.\n\nYeu cau giao dien:\n- Preview gradient toan chieu rong, dep mat\n- Color stops co the them/xoa/keo tha\n- Chon huong: linear (0-360 do) hoac radial\n- Hien thi CSS code real-time\n\nYeu cau chuc nang:\n- Tao linear gradient va radial gradient\n- Them nhieu color stops\n- Keo tha vi tri color stop\n- 20+ gradient preset dep\n- Copy CSS code\n- Export gradient thanh anh PNG\n- Chia se gradient qua URL (encode vao hash)\n\nTat ca code trong mot file HTML duy nhat.",
    },
    {
        id: 39,
        toolName: 'Box Shadow Generator',
        content: "Hay tao mot ung dung tao hieu ung do bong CSS bang HTML, CSS va JavaScript thuan.\n\nYeu cau giao dien:\n- Preview box voi shadow truc tiep\n- Sliders cho: offset-x, offset-y, blur, spread\n- Color picker cho mau bong\n- Toggle inset shadow\n\nYeu cau chuc nang:\n- Dieu chinh tat ca thuoc tinh box-shadow\n- Them nhieu lop shadow (multiple shadows)\n- 20+ shadow preset: soft, hard, neon, neumorphism...\n- Copy CSS code\n- Preview tren nen sang/toi\n- Hien thi code CSS va Tailwind tuong duong\n\nTat ca code trong mot file HTML duy nhat.",
    },
    {
        id: 40,
        toolName: 'Border Radius Picker',
        content: "Hay tao mot ung dung chon bo goc CSS bang HTML, CSS va JavaScript thuan.\n\nYeu cau giao dien:\n- Preview hinh vuong/chu nhat voi bo goc truc tiep\n- 4 slider cho 4 goc rieng biet\n- Toggle dong bo tat ca goc cung luc\n- Hien thi CSS code real-time\n\nYeu cau chuc nang:\n- Dieu chinh tung goc doc lap (top-left, top-right, bottom-right, bottom-left)\n- Ho tro gia tri elliptical (2 gia tri moi goc)\n- 15+ preset: circle, pill, leaf, blob...\n- Tao hinh dang blob ngau nhien\n- Copy CSS va Tailwind class\n- Hien thi don vi px va %\n\nTat ca code trong mot file HTML duy nhat.",
    },
    {
        id: 41,
        toolName: 'Flexbox Playground',
        content: "Hay tao mot ung dung thuc hanh Flexbox bang HTML, CSS va JavaScript thuan.\n\nYeu cau giao dien:\n- Container flex voi cac item co the them/xoa\n- Panel dieu khien tat ca thuoc tinh flex\n- Hien thi CSS code real-time\n- Giai thich tung thuoc tinh bang tieng Viet\n\nYeu cau chuc nang:\n- Dieu chinh: flex-direction, flex-wrap, justify-content, align-items, align-content\n- Dieu chinh tung item: flex-grow, flex-shrink, flex-basis, align-self, order\n- Them/xoa flex items\n- Thay doi kich thuoc container\n- 10+ layout preset pho bien\n- Copy CSS code\n\nTat ca code trong mot file HTML duy nhat, co giai thich ro rang.",
    },
    {
        id: 42,
        toolName: 'Grid Generator',
        content: "Hay tao mot ung dung tao layout CSS Grid bang HTML, CSS va JavaScript thuan.\n\nYeu cau giao dien:\n- Visual grid editor truc quan\n- Dieu chinh so cot, so hang, gap\n- Keo tha de merge cells\n- Hien thi CSS code real-time\n\nYeu cau chuc nang:\n- Dinh nghia grid-template-columns va rows (fr, px, auto, minmax)\n- Dat grid-area cho tung item\n- Dieu chinh gap (column-gap, row-gap)\n- 10+ layout preset: Holy Grail, Dashboard, Magazine...\n- Xuat CSS Grid code\n- Giai thich tung thuoc tinh\n\nTat ca code trong mot file HTML duy nhat.",
    },
    {
        id: 43,
        toolName: 'Aspect Ratio Calc',
        content: "Hay tao mot ung dung tinh ti le khung hinh bang HTML, CSS va JavaScript thuan.\n\nYeu cau giao dien:\n- Nhap chieu rong va chieu cao\n- Hien thi ti le duoi dang don gian nhat (16:9, 4:3...)\n- Preview hinh chu nhat theo ti le\n- Cac ti le pho bien de chon nhanh\n\nYeu cau chuc nang:\n- Tinh ti le tu kich thuoc bat ky\n- Tinh kich thuoc moi khi biet 1 chieu va ti le\n- Cac ti le chuan: 16:9, 4:3, 1:1, 21:9, 9:16, 3:2\n- Tinh kich thuoc responsive (% va px)\n- So sanh nhieu ti le cung luc\n- Ung dung thuc te: video, anh, man hinh\n\nTat ca code trong mot file HTML duy nhat.",
    },
    {
        id: 44,
        toolName: 'Pixel Converter',
        content: "Hay tao mot ung dung chuyen doi don vi CSS bang HTML, CSS va JavaScript thuan.\n\nYeu cau giao dien:\n- Nhap gia tri va chon don vi nguon\n- Hien thi ket qua tat ca don vi cung luc\n- Nhap base font-size (mac dinh 16px)\n- Thiet ke sach se, de doc\n\nYeu cau chuc nang:\n- Chuyen doi: px, rem, em, vw, vh, pt, pc, cm, mm, in\n- Tinh theo base font-size tuy chinh\n- Tinh theo viewport size tuy chinh\n- Hien thi ket qua real-time\n- Copy gia tri tung don vi\n- Giai thich khi nao dung don vi nao\n\nTat ca code trong mot file HTML duy nhat.",
    },
    {
        id: 45,
        toolName: 'Contrast Checker',
        content: "Hay tao mot ung dung kiem tra do tuong phan mau sac bang HTML, CSS va JavaScript thuan.\n\nYeu cau giao dien:\n- 2 color picker: mau chu va mau nen\n- Preview text tren nen truc tiep\n- Hien thi ti le tuong phan lon, ro rang\n- Badge WCAG AA/AAA Pass/Fail\n\nYeu cau chuc nang:\n- Tinh contrast ratio theo WCAG 2.1\n- Kiem tra AA (4.5:1 normal, 3:1 large) va AAA (7:1 normal, 4.5:1 large)\n- Goi y mau sac de dat chuan\n- Preview voi nhieu co chu khac nhau\n- Kiem tra ca mau text tren nen va nguoc lai\n- Hien thi mau HEX, RGB, HSL\n\nTat ca code trong mot file HTML duy nhat.",
    },
    {
        id: 46,
        toolName: 'Typing Speed Test',
        content: "Hay tao mot ung dung kiem tra toc do go phim bang HTML, CSS va JavaScript thuan.\n\nYeu cau giao dien:\n- Hien thi doan van can go, highlight tung tu\n- Mau xanh cho tu dung, do cho tu sai\n- Hien thi WPM va accuracy real-time\n- Dem nguoc thoi gian (30s, 60s, 120s)\n\nYeu cau chuc nang:\n- Do WPM (words per minute) va CPM (characters per minute)\n- Tinh do chinh xac (%)\n- Nhieu doan van mau (tieng Anh va tieng Viet)\n- Cac che do: 30 giay, 1 phut, 2 phut\n- Hien thi ket qua chi tiet sau khi ket thuc\n- Luu ky luc cao nhat\n\nTat ca code trong mot file HTML duy nhat.",
    },
    {
        id: 47,
        toolName: 'Flashcard Maker',
        content: "Hay tao mot ung dung tao the ghi nho bang HTML, CSS va JavaScript thuan.\n\nYeu cau giao dien:\n- The flashcard dep voi hieu ung lat (flip animation 3D)\n- Mat truoc: cau hoi/tu vung, mat sau: dap an/nghia\n- Nut Next/Previous de chuyen the\n- Progress bar hien thi tien do\n\nYeu cau chuc nang:\n- Tao, sua, xoa flashcard\n- Nhom the theo chu de\n- Che do hoc: hien thi ngau nhien hoac theo thu tu\n- Danh dau the da thuoc/chua thuoc\n- Thong ke: so the da hoc, ty le nho\n- Luu vao localStorage\n- Import/export danh sach the (CSV)\n\nTat ca code trong mot file HTML duy nhat.",
    },
    {
        id: 48,
        toolName: 'Quiz Generator',
        content: "Hay tao mot ung dung tao cau hoi trac nghiem bang HTML, CSS va JavaScript thuan.\n\nYeu cau giao dien:\n- Form tao cau hoi dep voi 4 lua chon\n- Hien thi quiz voi animation chuyen cau\n- Highlight dap an dung/sai sau khi chon\n- Ket qua cuoi voi diem so va nhan xet\n\nYeu cau chuc nang:\n- Tao cau hoi trac nghiem (4 lua chon, 1 dap an dung)\n- Them nhieu cau hoi, tao bo de\n- Xao tron thu tu cau hoi va dap an\n- Tinh diem va hien thi ket qua\n- Xem lai cac cau sai\n- Luu bo de vao localStorage\n- Export de thi ra JSON\n\nTat ca code trong mot file HTML duy nhat.",
    },
    {
        id: 49,
        toolName: 'Habit Tracker',
        content: "Hay tao mot ung dung theo doi thoi quen bang HTML, CSS va JavaScript thuan.\n\nYeu cau giao dien:\n- Danh sach thoi quen voi checkbox hang ngay\n- Streak counter (so ngay lien tuc) noi bat\n- Calendar view hien thi lich su 30 ngay\n- Mau sac khac nhau cho tung thoi quen\n\nYeu cau chuc nang:\n- Them, sua, xoa thoi quen\n- Danh dau hoan thanh moi ngay\n- Tinh streak (so ngay lien tuc hoan thanh)\n- Thong ke: ty le hoan thanh, streak dai nhat\n- Nhac nho (browser notification)\n- Luu du lieu vao localStorage\n- Xuat bao cao hang tuan\n\nTat ca code trong mot file HTML duy nhat.",
    },
    {
        id: 50,
        toolName: 'Focus Music',
        content: "Hay tao mot ung dung am thanh tap trung bang HTML, CSS va JavaScript thuan (Web Audio API).\n\nYeu cau giao dien:\n- Thiet ke toi gian, thu gian, mau xanh duong/tim\n- Cac nut chon loai am thanh voi icon dep\n- Volume slider va visualizer song am don gian\n- Ket hop voi Pomodoro timer nho\n\nYeu cau chuc nang:\n- Tao am thanh bang Web Audio API (khong can file ngoai):\n  + White noise (tap am trang)\n  + Brown noise (am trau)\n  + Rain sound (tieng mua)\n  + Cafe ambience (tieng quan ca phe)\n  + Binaural beats (nhip dieu chinh nao)\n- Dieu chinh am luong tung loai\n- Hen gio tu dong tat\n- Luu cai dat yeu thich\n\nTat ca code trong mot file HTML duy nhat, giai thich Web Audio API.",
    },
]

