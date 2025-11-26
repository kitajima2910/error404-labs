# 📘 **Bài 03: Định dạng trang web**

## 🎯 **Học được gì qua bài này**

- Xây dựng cấu trúc trang Web bằng cách sử dụng các **thẻ HTML** cơ bản và hiệu quả
- Tùy chỉnh và định dạng các phần tử trang web thông qua **thuộc tính HTML**
- Trang trí giao diện Web một cách chuyên nghiệp bằng **CSS cơ bản**, bao gồm nền, màu chữ, vị trí và kích thước

---

## 🧩 **Kiến thức cần học thêm**

### 🌟 **Tính năng CSS cơ bản**

| Thuộc tính CSS          | Ý nghĩa                                    | Ví dụ                                             |
| ----------------------- | ------------------------------------------ | ------------------------------------------------- |
| `background-image`      | Đặt hình ảnh làm nền cho phần tử           | `background-image: url('image.jpg');`             |
| `background-position`   | Xác định vị trí hiển thị của hình ảnh nền  | `background-position: center;` hoặc `50% 50%;`    |
| `background-repeat`     | Kiểm soát cách lặp lại hình ảnh nền        | `background-repeat: no-repeat;` hoặc `repeat-x;`  |
| `background-attachment` | Xác định cách nền cuộn khi trang di chuyển | `background-attachment: fixed;` hoặc `scroll;`    |
| `background-size`       | Đặt kích thước của hình ảnh nền            | `background-size: cover;` hoặc `100px 200px;`     |
| `background-blend-mode` | Xác định cách pha trộn hình ảnh nền        | `background-blend-mode: multiply;` hoặc `screen;` |
| `text-transform`        | Chuyển đổi kiểu chữ của văn bản            | `text-transform: uppercase;` hoặc `capitalize;`   |

**Giải thích:**

- **`background-image`**: Được sử dụng để thêm một hoặc nhiều hình ảnh làm nền. Giá trị thường là `url('đường-dẫn-ảnh')`. Nếu không có hình ảnh, bạn có thể sử dụng `background-color` để set màu nền thay thế.

- **`background-position`**: Xác định vị trí bắt đầu của hình ảnh nền. Các giá trị phổ biến bao gồm `top`, `bottom`, `left`, `right`, `center`, hoặc sử dụng tọa độ như `10px 20px` (trái, trên) hay phần trăm `25% 75%`.

- **`background-repeat`**: Kiểm soát việc lặp lại hình ảnh nền. Các giá trị bao gồm:
  - `repeat` (mặc định): lặp lại cả chiều ngang và dọc
  - `repeat-x`: chỉ lặp lại theo chiều ngang
  - `repeat-y`: chỉ lặp lại theo chiều dọc
  - `no-repeat`: không lặp lại

- **`background-attachment`**: Kiểm soát xem hình ảnh nền có cuộn cùng nội dung hay cố định:
  - `scroll` (mặc định): hình ảnh cuộn cùng nội dung
  - `fixed`: hình ảnh cố định và không cuộn khi trang di chuyển
  - `local`: hình ảnh cuộn với nội dung phần tử

- **`background-size`**: Đặt kích thước hiển thị của hình ảnh nền:
  - `cover`: phóng to ảnh để che phủ toàn bộ phần tử (có thể cắt)
  - `contain`: hiển thị toàn bộ ảnh trong phần tử
  - `100% 100%`: kéo giãn ảnh theo kích thước phần tử
  - `200px 150px`: đặt kích thước cụ thể

- **`background-blend-mode`**: Xác định cách pha trộn hình ảnh nền với màu nền hoặc nội dung phía dưới:
  - `multiply`: làm tối hơn
  - `screen`: làm sáng hơn
  - `overlay`: kết hợp multiply và screen
  - `darken`, `lighten`, `color-dodge`, v.v.

- **`text-transform`**: Chuyển đổi kiểu chữ của văn bản mà không thay đổi HTML:
  - `uppercase`: chuyển tất cả thành CHỮ HOA
  - `lowercase`: chuyển tất cả thành chữ thường
  - `capitalize`: viết hoa chữ cái đầu của mỗi từ
  - `none` (mặc định): không thay đổi

---

## 📝 **Yêu cầu bài tập**

> Nhiệm vụ: mô tả ngắn gọn sản phẩm cần làm

| Đối tượng | Yêu cầu                                                                      | Mã màu  |
| --------- | ---------------------------------------------------------------------------- | ------- |
| Trang web | - Tiêu đề trang web: Định dạng trang web                                     |         |
| Nội dung  | - Định dạng chung:<br/>                                                      |         |
|           | <ul><li>Nền: Màu nâu đất</li></ul>                                           | #A06D21 |
|           | <ul><li>Chữ: Màu trắng</li></ul>                                             | #FFFFFF |
|           | <ul><li>Hình nền: Đặt giữa trang và không di chuyển khi cuộn trang</li></ul> |         |
|           | - Dòng đầu tiên: Canh giữa, màu vàng đậm, chữ in hoa                         | #FFCC00 |

### 📸 Hình ảnh minh hoạ bài tập (tài nguyên: <a href="/hoc-lap-trinh-web/khoa-hoc-slideshare/bai-03/assets.rar" download="">tải xuống</a>)

![Hình ảnh minh hoạ bài tập](/hoc-lap-trinh-web/khoa-hoc-slideshare/bai-03/demo.png)

---

## 💡 **Code mẫu (để tham khảo)**

<details>
<summary>Xem code mẫu</summary>

<pre class="code_syntax" style="color:#000000;background:#ffffff;"><span class="line_wrapper"><span style="color:#004a43; ">&lt;!doctype html&gt;</span></span>
<span class="line_wrapper"><span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">html</span><span style="color:#274796; "> </span><span style="color:#074726; ">lang</span><span style="color:#808030; ">=</span><span style="color:#0000e6; ">"vi"</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper">    <span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">head</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper">        <span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">meta</span><span style="color:#274796; "> </span><span style="color:#074726; ">charset</span><span style="color:#808030; ">=</span><span style="color:#0000e6; ">"UTF-8"</span><span style="color:#274796; "> </span><span style="color:#a65700; ">/&gt;</span></span>
<span class="line_wrapper">        <span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">meta</span><span style="color:#274796; "> </span><span style="color:#074726; ">name</span><span style="color:#808030; ">=</span><span style="color:#0000e6; ">"viewport"</span><span style="color:#274796; "> </span><span style="color:#074726; ">content</span><span style="color:#808030; ">=</span><span style="color:#0000e6; ">"width=device-width, initial-scale=1.0"</span><span style="color:#274796; "> </span><span style="color:#a65700; ">/&gt;</span></span>
<span class="line_wrapper">        <span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">title</span><span style="color:#a65700; ">&gt;</span>Định dạng trang web<span style="color:#a65700; ">&lt;/</span><span style="color:#800000; font-weight:bold; ">title</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper">    <span style="color:#a65700; ">&lt;/</span><span style="color:#800000; font-weight:bold; ">head</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper">    <span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">body</span><span style="color:#5f5035; "></span></span>
<span class="line_wrapper"><span style="color:#274796; ">        </span><span style="color:#074726; ">style</span><span style="color:#808030; ">=</span><span style="color:#0000e6; ">"</span><span style="color:#274796; "></span></span>
<span class="line_wrapper"><span style="color:#274796; ">            </span><span style="color:#bb7977; font-weight:bold; ">background-color</span><span style="color:#808030; ">:</span><span style="color:#274796; "> </span><span style="color:#008c00; ">#</span><span style="color:#008000; ">a06d21</span><span style="color:#800080; ">;</span><span style="color:#274796; "></span></span>
<span class="line_wrapper"><span style="color:#274796; ">            </span><span style="color:#bb7977; font-weight:bold; ">color</span><span style="color:#808030; ">:</span><span style="color:#274796; "> </span><span style="color:#008c00; ">#</span><span style="color:#008000; ">fff</span><span style="color:#800080; ">;</span><span style="color:#274796; "></span></span>
<span class="line_wrapper"><span style="color:#274796; ">            </span><span style="color:#bb7977; font-weight:bold; ">background-image</span><span style="color:#808030; ">:</span><span style="color:#274796; "> </span><span style="color:#400000; ">url</span><span style="color:#808030; ">(</span><span style="color:#0000e6; ">'</span><span style="color:#666616; ">https</span><span style="color:#800080; ">:</span><span style="color:#800000; font-weight:bold; ">//</span><span style="color:#5555dd; ">uploads.onecompiler.io</span><span style="color:#40015a; ">/442t2gwzd/444zm92ph/lorem-ipsum.png</span><span style="color:#0000e6; ">'</span><span style="color:#808030; ">)</span><span style="color:#800080; ">;</span><span style="color:#274796; "></span></span>
<span class="line_wrapper"><span style="color:#274796; ">            </span><span style="color:#bb7977; font-weight:bold; ">background-position</span><span style="color:#808030; ">:</span><span style="color:#274796; "> </span><span style="color:#074726; ">center</span><span style="color:#274796; "> </span><span style="color:#074726; ">center</span><span style="color:#800080; ">;</span><span style="color:#274796; "></span></span>
<span class="line_wrapper"><span style="color:#274796; ">            </span><span style="color:#bb7977; font-weight:bold; ">background-repeat</span><span style="color:#808030; ">:</span><span style="color:#274796; "> </span><span style="color:#074726; ">no-repeat</span><span style="color:#800080; ">;</span><span style="color:#274796; "></span></span>
<span class="line_wrapper"><span style="color:#274796; ">            </span><span style="color:#bb7977; font-weight:bold; ">background-attachment</span><span style="color:#808030; ">:</span><span style="color:#274796; "> </span><span style="color:#074726; ">fixed</span><span style="color:#800080; ">;</span><span style="color:#274796; "></span></span>
<span class="line_wrapper"><span style="color:#274796; ">            </span><span style="color:#bb7977; font-weight:bold; ">background-size</span><span style="color:#808030; ">:</span><span style="color:#274796; "> </span><span style="color:#008c00; ">50</span><span style="color:#006600; ">%</span><span style="color:#800080; ">;</span><span style="color:#274796; "></span></span>
<span class="line_wrapper"><span style="color:#274796; ">            background-blend-mode</span><span style="color:#808030; ">:</span><span style="color:#274796; "> darken</span><span style="color:#800080; ">;</span><span style="color:#274796; "></span></span>
<span class="line_wrapper"><span style="color:#274796; ">        </span><span style="color:#0000e6; ">"</span><span style="color:#5f5035; "></span></span>
<span class="line_wrapper"><span style="color:#274796; ">    </span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper">        <span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">h2</span><span style="color:#274796; "> </span><span style="color:#074726; ">align</span><span style="color:#808030; ">=</span><span style="color:#0000e6; ">"center"</span><span style="color:#274796; "> </span><span style="color:#074726; ">style</span><span style="color:#808030; ">=</span><span style="color:#0000e6; ">"</span><span style="color:#bb7977; font-weight:bold; ">color</span><span style="color:#808030; ">:</span><span style="color:#274796; "> </span><span style="color:#008c00; ">#</span><span style="color:#008000; ">ffcc00</span><span style="color:#800080; ">;</span><span style="color:#274796; "> </span><span style="color:#bb7977; font-weight:bold; ">text-transform</span><span style="color:#808030; ">:</span><span style="color:#274796; "> </span><span style="color:#074726; ">uppercase</span><span style="color:#0000e6; ">"</span><span style="color:#a65700; ">&gt;</span>Lorem Ipsum<span style="color:#a65700; ">&lt;/</span><span style="color:#800000; font-weight:bold; ">h2</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper">        <span style="color:#a65700; ">&lt;</span><span style="color:#800000; font-weight:bold; ">p</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper">            Lorem ipsum dolor, sit amet consectetur adipisicing elit<span style="color:#008c00; ">.</span> Beatae assumenda ipsa vero</span>
<span class="line_wrapper">            reiciendis excepturi odit eligendi, sint architecto fuga, ipsam aspernatur aperiam eveniet</span>
<span class="line_wrapper">            sapiente eaque delectus fugiat exercitationem rem<span style="color:#008c00; ">.</span> Repellendus eum ipsa amet maiores nostrum</span>
<span class="line_wrapper">            nesciunt nobis explicabo quod eaque<span style="color:#008c00; ">.</span> Possimus obcaecati debitis porro ipsum quisquam,</span>
<span class="line_wrapper">            accusamus fuga dolor nostrum cum beatae rerum quidem dicta soluta earum cumque sed explicabo</span>
<span class="line_wrapper">            laudantium impedit animi corporis<span style="color:#008c00; ">.</span> Architecto quasi eaque asperiores deleniti quos facere</span>
<span class="line_wrapper">            itaque rem dolores<span style="color:#008c00; ">.</span> Soluta quaerat exercitationem doloribus atque fuga explicabo officia, non</span>
<span class="line_wrapper">            ullam quos alias obcaecati sunt<span style="color:#008c00; ">.</span> Dolores voluptatem eius animi voluptas, consequuntur tempora</span>
<span class="line_wrapper">            voluptate, vitae recusandae fuga enim pariatur doloremque, cupiditate dolorum possimus</span>
<span class="line_wrapper">            suscipit<span style="color:#008c00; ">.</span> Unde cupiditate assumenda natus sit architecto, aspernatur, eos saepe quia est non</span>
<span class="line_wrapper">            omnis quae cum autem<span style="color:#008c00; ">.</span> Iure a accusantium sapiente, error veniam sed accusamus, aut saepe</span>
<span class="line_wrapper">            exercitationem, recusandae illo ut eveniet nostrum! Voluptatem optio quaerat odit accusantium?</span>
<span class="line_wrapper">            Optio hic consequatur non fuga neque tempore perspiciatis ipsum iure, dolorum vel minima quo<span style="color:#008c00; ">.</span></span>
<span class="line_wrapper">            Officia sapiente amet, temporibus magni ducimus aut facere non? Perspiciatis consectetur quos</span>
<span class="line_wrapper">            laborum atque laboriosam, illum, natus officiis distinctio molestias accusantium praesentium</span>
<span class="line_wrapper">            facilis mollitia earum iste obcaecati architecto hic ad aspernatur? Ullam autem aspernatur, ab</span>
<span class="line_wrapper">            sunt consequuntur temporibus laudantium non laborum sit quos ut tempore asperiores</span>
<span class="line_wrapper">            voluptatibus quas nobis voluptates pariatur<span style="color:#008c00; ">.</span> Excepturi fuga deserunt ducimus ea tenetur</span>
<span class="line_wrapper">            eligendi reprehenderit, incidunt odit, pariatur nostrum possimus libero unde illo officia,</span>
<span class="line_wrapper">            distinctio dolor minus omnis ex! Molestiae ut minima modi laboriosam velit repellendus facere</span>
<span class="line_wrapper">            non accusamus cupiditate, neque facilis mollitia adipisci tempora eveniet libero dolorem</span>
<span class="line_wrapper">            temporibus assumenda autem! Voluptates repudiandae nostrum rerum quas assumenda eaque,</span>
<span class="line_wrapper">            obcaecati vel hic aliquam illum enim dolores laboriosam porro ad ratione consectetur itaque in</span>
<span class="line_wrapper">            esse provident inventore quia quaerat! Nostrum ea molestias soluta veritatis, porro dolor</span>
<span class="line_wrapper">            esse<span style="color:#008c00; ">.</span> Fuga quas qui voluptatem alias animi veniam recusandae sint, quos labore exercitationem</span>
<span class="line_wrapper">            ad eligendi optio eveniet, dicta, perferendis officia consectetur<span style="color:#008c00; ">.</span> Accusamus tempora quos</span>
<span class="line_wrapper">            ullam placeat velit<span style="color:#008c00; ">.</span> Maiores, nam<span style="color:#008c00; ">.</span> Reprehenderit, velit? Iure cum quod quibusdam harum ea</span>
<span class="line_wrapper">            assumenda accusantium quis quia excepturi<span style="color:#008c00; ">.</span> Fuga, eum enim<span style="color:#008c00; ">.</span> Corrupti nisi vitae aspernatur sed</span>
<span class="line_wrapper">            eum provident atque quae enim facilis, totam soluta autem cumque explicabo velit error</span>
<span class="line_wrapper">            deleniti suscipit officia<span style="color:#008c00; ">.</span> Quae recusandae, magnam sit quasi, repellendus itaque placeat</span>
<span class="line_wrapper">            facilis quisquam possimus iste similique nisi voluptatibus, vero vel voluptas provident esse</span>
<span class="line_wrapper">            minima? Maiores id odio ad amet veniam officiis, magni tempore autem accusantium odit iusto</span>
<span class="line_wrapper">            libero suscipit assumenda aliquam<span style="color:#008c00; ">.</span> Natus tempore quaerat repellendus veniam modi velit ullam,</span>
<span class="line_wrapper">            dicta deserunt ipsa totam temporibus maiores blanditiis unde porro id eum voluptatibus</span>
<span class="line_wrapper">            mollitia inventore labore ipsam<span style="color:#008c00; ">.</span> Enim fugiat nam ipsum quae atque omnis rem dolores ad</span>
<span class="line_wrapper">            cupiditate totam, accusantium praesentium dolore amet odit modi est reprehenderit alias! Velit</span>
<span class="line_wrapper">            molestias voluptas porro quis fugiat eum, atque tenetur totam ad, ipsa hic? Cumque molestias</span>
<span class="line_wrapper">            odit placeat ipsa quia labore architecto exercitationem enim vitae velit? Quia hic ipsa</span>
<span class="line_wrapper">            tenetur repellendus rerum voluptate temporibus id magni quos reprehenderit fugit at dolor</span>
<span class="line_wrapper">            natus quam excepturi consectetur voluptatum pariatur harum, ipsam qui ipsum<span style="color:#008c00; ">.</span> Recusandae fugit</span>
<span class="line_wrapper">            eligendi, tempore consectetur laborum, nobis dolor distinctio nihil placeat impedit totam</span>
<span class="line_wrapper">            doloribus qui, voluptates labore iste assumenda sed? Quisquam quod, vero dolores veniam saepe</span>
<span class="line_wrapper">            earum alias provident ea eaque ipsam incidunt quasi porro cum eos in iure aspernatur nihil hic</span>
<span class="line_wrapper">            nostrum! Necessitatibus eum nisi ut iure possimus omnis, odio molestiae provident cum? Tenetur</span>
<span class="line_wrapper">            veniam, facilis minus nobis consequatur eveniet totam id impedit iusto sit<span style="color:#008c00; ">.</span> Eaque sed quos</span>
<span class="line_wrapper">            eligendi esse natus, sunt fuga? Similique, repellat dolorum? Ducimus ullam voluptatem</span>
<span class="line_wrapper">            voluptate dolorum itaque? Id iste, quam quidem, nostrum distinctio at provident modi maxime</span>
<span class="line_wrapper">            necessitatibus corrupti ut eius veniam numquam quos consectetur ipsa illum a commodi quisquam</span>
<span class="line_wrapper">            rem obcaecati vitae<span style="color:#008c00; ">.</span> Velit aspernatur repellat perspiciatis tempora accusamus, inventore sit</span>
<span class="line_wrapper">            consequuntur est, quisquam autem numquam ipsa facere quaerat voluptatibus dolor fuga<span style="color:#008c00; ">.</span> Vero</span>
<span class="line_wrapper">            temporibus provident minima possimus voluptatibus harum suscipit quas iure deserunt laboriosam</span>
<span class="line_wrapper">            dolore aliquam quibusdam optio, cumque animi sit a aspernatur quia qui mollitia soluta autem</span>
<span class="line_wrapper">            voluptatem culpa! Rerum minus non nesciunt excepturi id ut facilis earum, voluptatum incidunt</span>
<span class="line_wrapper">            repellendus corporis beatae dolore! Quod tenetur dolores suscipit recusandae, voluptatibus a<span style="color:#008c00; ">.</span></span>
<span class="line_wrapper">            Nemo quibusdam alias repellendus minus cum soluta iure mollitia, error veritatis quae</span>
<span class="line_wrapper">            laudantium explicabo odit labore voluptate molestias sapiente? Dolor saepe amet est corporis</span>
<span class="line_wrapper">            quisquam et aliquid reprehenderit, doloremque omnis? Expedita voluptates, eius quod distinctio</span>
<span class="line_wrapper">            nisi at molestiae iste corporis cupiditate unde dolore tempora necessitatibus<span style="color:#008c00; ">.</span> Odio rerum,</span>
<span class="line_wrapper">            impedit corrupti suscipit tempora nesciunt, temporibus animi dolore ipsa exercitationem</span>
<span class="line_wrapper">            perspiciatis accusamus quod dolor vero deserunt nisi veritatis obcaecati! Ipsum dicta</span>
<span class="line_wrapper">            consequuntur ipsam aut, cumque non excepturi, eos totam officia voluptatibus autem rerum quasi</span>
<span class="line_wrapper">            corrupti quidem recusandae? Porro accusamus nesciunt in ut distinctio! Alias, placeat a quam</span>
<span class="line_wrapper">            adipisci tempore odio, ipsa exercitationem incidunt esse voluptatum, atque necessitatibus</span>
<span class="line_wrapper">            explicabo veritatis modi doloremque at enim neque commodi<span style="color:#008c00; ">.</span> Fugit autem nisi rerum</span>
<span class="line_wrapper">            necessitatibus<span style="color:#008c00; ">.</span> Cum non, voluptate inventore facere iste enim quia natus maiores in veniam?</span>
<span class="line_wrapper">            Pariatur quam at labore itaque, maiores explicabo officiis cumque illum nam iste tenetur nobis</span>
<span class="line_wrapper">            quis culpa odit possimus vero aliquid sed molestiae minima expedita illo maxime dolore</span>
<span class="line_wrapper">            deleniti esse! Veniam, quibusdam illum<span style="color:#008c00; ">.</span> Unde reprehenderit harum ratione impedit culpa</span>
<span class="line_wrapper">            accusantium cupiditate tenetur aspernatur, ex eos numquam itaque suscipit et totam, asperiores</span>
<span class="line_wrapper">            vitae, porro aliquid voluptatem! Tenetur quibusdam quo sunt incidunt molestias culpa voluptas</span>
<span class="line_wrapper">            dolorum nulla nostrum exercitationem saepe iste doloremque praesentium animi deserunt velit</span>
<span class="line_wrapper">            fuga dolor veniam, illum illo? Aspernatur architecto natus autem at sunt consectetur quas</span>
<span class="line_wrapper">            quasi alias, non, tempora quo dignissimos, harum magnam repellat sint quidem laborum sapiente</span>
<span class="line_wrapper">            eveniet deserunt<span style="color:#008c00; ">.</span> Alias modi sed dignissimos soluta maxime natus dolores, minus tenetur,</span>
<span class="line_wrapper">            necessitatibus est quae expedita libero ipsum blanditiis dolore odio dolorem quos, officia</span>
<span class="line_wrapper">            voluptates a at provident<span style="color:#008c00; ">.</span> Fuga ex voluptas vero nostrum impedit recusandae illum? Ut eos ex</span>
<span class="line_wrapper">            voluptatem culpa commodi iste hic sapiente deserunt cupiditate sint quod ipsum quam assumenda</span>
<span class="line_wrapper">            perferendis corrupti ab suscipit natus iusto fugiat, ullam accusamus placeat animi corporis<span style="color:#008c00; ">.</span></span>
<span class="line_wrapper">            Modi quod tenetur voluptate blanditiis cumque dolorum pariatur porro numquam quo nulla, atque</span>
<span class="line_wrapper">            laudantium eveniet suscipit asperiores corporis eos voluptatem cum omnis quas reprehenderit</span>
<span class="line_wrapper">            fuga amet ut impedit sint? Officia, eaque? Atque ducimus nobis quod aut aperiam?</span>
<span class="line_wrapper">            Necessitatibus ducimus est suscipit accusamus beatae recusandae a ex quibusdam qui quam</span>
<span class="line_wrapper">            officiis nam distinctio expedita consequatur, nemo sunt possimus deleniti, ea quas velit modi</span>
<span class="line_wrapper">            natus amet<span style="color:#008c00; ">.</span> Tenetur accusamus dolorem reiciendis iure ipsum<span style="color:#008c00; ">.</span> Temporibus, enim amet<span style="color:#008c00; ">.</span> Similique</span>
<span class="line_wrapper">            asperiores nesciunt cumque totam nisi beatae quibusdam! Doloribus cum id, quis mollitia</span>
<span class="line_wrapper">            maiores commodi architecto officia natus, consequatur dolorem qui quaerat aliquam voluptatem</span>
<span class="line_wrapper">            inventore accusantium, molestiae rem? Deserunt tenetur, minus at dolorum nemo in deleniti</span>
<span class="line_wrapper">            alias illo ratione dolores consequuntur accusantium aspernatur iusto quae, consequatur fugit</span>
<span class="line_wrapper">            debitis atque itaque odit? Fugiat unde expedita architecto dolore fugit minus perferendis</span>
<span class="line_wrapper">            aspernatur voluptatum eius, nostrum voluptas voluptatem vel id eligendi dolor illum</span>
<span class="line_wrapper">            consequuntur aliquam quisquam? Eaque expedita est alias quaerat ut corporis sunt! Dicta</span>
<span class="line_wrapper">            reiciendis est autem officia ratione laborum nam quibusdam<span style="color:#008c00; ">.</span> Quis in eveniet unde inventore</span>
<span class="line_wrapper">            quasi vel tempora possimus error porro, ipsa, itaque doloribus sint dolorum facilis dolore?</span>
<span class="line_wrapper">            Dolore perspiciatis dolorum nemo accusamus pariatur ut nobis in sequi dolores velit laborum</span>
<span class="line_wrapper">            quibusdam, iste, dicta rem cupiditate magni enim error repellat cumque libero minus? Ipsam hic</span>
<span class="line_wrapper">            tenetur fugit rem ex excepturi quod debitis modi veritatis culpa reiciendis dolores error</span>
<span class="line_wrapper">            saepe, possimus mollitia adipisci nobis ipsum amet ad commodi vel voluptates suscipit</span>
<span class="line_wrapper">            assumenda<span style="color:#008c00; ">.</span> Magni sed earum ipsum aperiam laboriosam commodi assumenda ipsa fugit similique</span>
<span class="line_wrapper">            nulla omnis cupiditate illum aspernatur praesentium fuga nesciunt delectus amet asperiores,</span>
<span class="line_wrapper">            reprehenderit quo<span style="color:#008c00; ">.</span> Reiciendis alias amet voluptatibus perspiciatis excepturi doloremque dicta</span>
<span class="line_wrapper">            voluptate? Odio perferendis nam, aut facilis cumque at magnam ut molestias voluptate itaque</span>
<span class="line_wrapper">            cum accusamus impedit debitis aliquam laudantium eos, nostrum iusto officiis quaerat sed</span>
<span class="line_wrapper">            architecto<span style="color:#008c00; ">.</span> Veniam quisquam quidem eveniet reprehenderit eos aliquid sapiente maiores?</span>
<span class="line_wrapper">            Expedita commodi atque deleniti<span style="color:#008c00; ">.</span> Et sed necessitatibus, ad maxime, assumenda dolorum ex nobis</span>
<span class="line_wrapper">            tenetur minus, laboriosam numquam at reprehenderit<span style="color:#008c00; ">.</span> Alias eaque odit ipsa laudantium optio</span>
<span class="line_wrapper">            vitae quam explicabo ad, saepe perferendis at fugit! Voluptatum sunt necessitatibus commodi</span>
<span class="line_wrapper">            assumenda? Totam odit ducimus quae reprehenderit consequatur nemo rerum deleniti hic</span>
<span class="line_wrapper">            blanditiis corporis! Repellat ex iure doloremque magnam ratione nemo harum, eligendi aut</span>
<span class="line_wrapper">            deleniti assumenda? Vitae ipsa similique fugiat maiores distinctio, reiciendis dicta qui</span>
<span class="line_wrapper">            voluptas quo? Cum quasi dolorem magni sit in suscipit beatae temporibus ab possimus sed<span style="color:#008c00; ">.</span></span>
<span class="line_wrapper">            Similique rerum explicabo iusto, est, ad ab velit, quas qui eius debitis odio! Molestiae atque</span>
<span class="line_wrapper">            optio amet! Quod eos, repellendus voluptate illum voluptates optio debitis quia! Placeat</span>
<span class="line_wrapper">            voluptate esse ad accusamus nemo animi non laboriosam voluptatem totam cupiditate quia nobis</span>
<span class="line_wrapper">            molestias maxime aspernatur at nihil harum consequatur, cumque laborum praesentium quasi sint</span>
<span class="line_wrapper">            nisi nulla quam! Repellat delectus excepturi, consequuntur ratione quidem nesciunt error</span>
<span class="line_wrapper">            perferendis illum alias ex<span style="color:#008c00; ">.</span> At repellendus, hic magnam maxime nemo natus placeat eaque,</span>
<span class="line_wrapper">            facilis, voluptatem ducimus libero id<span style="color:#008c00; ">.</span> Architecto ab exercitationem quidem maiores voluptatum</span>
<span class="line_wrapper">            possimus nobis ipsa<span style="color:#008c00; ">.</span> Vero maxime ratione ea minima distinctio voluptates odio atque deleniti</span>
<span class="line_wrapper">            quaerat, dolore eveniet excepturi expedita esse! Atque ab culpa quaerat facilis corrupti error</span>
<span class="line_wrapper">            hic voluptate dolorum, aliquid debitis voluptas molestias saepe numquam velit illo assumenda</span>
<span class="line_wrapper">            voluptatibus sequi consectetur possimus incidunt animi, necessitatibus vero! Exercitationem</span>
<span class="line_wrapper">            assumenda omnis dolorem expedita nam suscipit debitis soluta modi, ipsum fugit velit alias</span>
<span class="line_wrapper">            nesciunt sunt aperiam at rem similique quam officiis nihil<span style="color:#008c00; ">.</span> Enim, porro dolor itaque</span>
<span class="line_wrapper">            reiciendis eius minima neque tempora iure? Enim adipisci fuga accusantium, eveniet eum sed</span>
<span class="line_wrapper">            delectus doloribus ex pariatur, deleniti consectetur! Tenetur quae accusamus saepe excepturi?</span>
<span class="line_wrapper">            Illo harum perferendis repellat dolor adipisci iste commodi officia quaerat enim repellendus</span>
<span class="line_wrapper">            optio soluta, eos, illum accusantium, rem molestiae itaque nobis quidem blanditiis beatae</span>
<span class="line_wrapper">            earum dolorum mollitia ipsum sed<span style="color:#008c00; ">.</span> Possimus doloremque, neque suscipit explicabo nobis nisi</span>
<span class="line_wrapper">            vitae eveniet quam! Eius natus eligendi harum aut numquam quaerat? Possimus mollitia</span>
<span class="line_wrapper">            laboriosam odit, hic dolore molestias culpa, temporibus voluptas reiciendis, rerum quibusdam</span>
<span class="line_wrapper">            officiis? Commodi quia libero quaerat inventore numquam totam quasi reiciendis incidunt</span>
<span class="line_wrapper">            consequatur, facilis dolor similique, consectetur unde illum! Possimus illum culpa sunt</span>
<span class="line_wrapper">            magnam<span style="color:#008c00; ">.</span> Distinctio vitae esse velit, quos rem sunt impedit cumque assumenda animi suscipit</span>
<span class="line_wrapper">            dolor? Qui ipsum laboriosam at quasi, laudantium dicta minima natus ut in nesciunt? Animi</span>
<span class="line_wrapper">            voluptas debitis non cumque<span style="color:#008c00; ">.</span> Beatae eveniet officiis laudantium quam inventore, doloremque</span>
<span class="line_wrapper">            voluptatibus<span style="color:#008c00; ">.</span> Maiores dicta autem tenetur, quibusdam consequuntur commodi, est blanditiis</span>
<span class="line_wrapper">            sequi illum ab non ea adipisci quasi animi, nulla rem sapiente laborum tempora debitis</span>
<span class="line_wrapper">            laboriosam mollitia molestias iste itaque reiciendis<span style="color:#008c00; ">.</span> Consequuntur officia maiores nisi quod</span>
<span class="line_wrapper">            nihil dignissimos corporis ea hic molestiae perspiciatis dicta maxime itaque quidem</span>
<span class="line_wrapper">            exercitationem quas cupiditate voluptates dolorum voluptatum, aliquam facilis? Qui ut pariatur</span>
<span class="line_wrapper">            nihil, veniam reprehenderit quidem id, perspiciatis sed sint velit blanditiis? Aliquid fugiat</span>
<span class="line_wrapper">            dicta non<span style="color:#008c00; ">.</span> Porro debitis fuga magnam odit assumenda officia consequuntur possimus, qui cum at</span>
<span class="line_wrapper">            magni natus nobis rem nisi laborum rerum nam doloremque vitae, quaerat obcaecati enim,</span>
<span class="line_wrapper">            voluptatibus velit sapiente libero<span style="color:#008c00; ">.</span> Dolor est a voluptatibus sunt exercitationem assumenda</span>
<span class="line_wrapper">            voluptatem repudiandae praesentium non quaerat perferendis qui nam amet quasi eligendi</span>
<span class="line_wrapper">            asperiores recusandae tempora quae temporibus, ab voluptas obcaecati totam! Suscipit, eos</span>
<span class="line_wrapper">            ratione in optio modi, tempora quas dolorum necessitatibus odit vel quam quos sed provident</span>
<span class="line_wrapper">            ipsam<span style="color:#008c00; ">.</span> Quod obcaecati asperiores, consequuntur, blanditiis nisi excepturi facere perferendis</span>
<span class="line_wrapper">            ipsam dolor fugiat odit corrupti possimus! Consectetur dolores aliquam cumque, enim distinctio</span>
<span class="line_wrapper">            quo velit autem dolorem officiis tenetur? Illum quis provident quae et nam maxime minus,</span>
<span class="line_wrapper">            libero laudantium molestias exercitationem quod nobis harum quisquam, tempora delectus</span>
<span class="line_wrapper">            eligendi sed cupiditate sunt illo<span style="color:#008c00; ">.</span> Laudantium reiciendis facere perspiciatis ducimus modi</span>
<span class="line_wrapper">            aliquam atque molestias soluta nisi quibusdam ea minus cumque, nobis deleniti in aut odit</span>
<span class="line_wrapper">            consequuntur<span style="color:#008c00; ">.</span> Asperiores ex, porro architecto velit iure tenetur reiciendis nisi omnis tempora</span>
<span class="line_wrapper">            earum aliquam ut suscipit distinctio numquam<span style="color:#008c00; ">.</span> Facere sunt architecto maiores mollitia</span>
<span class="line_wrapper">            quibusdam sit amet est debitis inventore, magni dolorem eius, voluptatibus pariatur corporis</span>
<span class="line_wrapper">            necessitatibus ut, reiciendis maxime libero accusamus adipisci fuga! Repudiandae maiores,</span>
<span class="line_wrapper">            fugiat, numquam voluptatibus magni ratione iure dolores sapiente minima ad eos! Unde eius nemo</span>
<span class="line_wrapper">            non ad fuga quam quaerat hic fugiat quia corrupti alias eligendi nam earum sint totam incidunt</span>
<span class="line_wrapper">            atque rem voluptatem ratione quisquam eos quibusdam tempora, nulla aliquam? Alias obcaecati</span>
<span class="line_wrapper">            inventore explicabo earum<span style="color:#008c00; ">.</span> Mollitia blanditiis doloribus dolorem corporis repudiandae facilis,</span>
<span class="line_wrapper">            ullam optio facere qui quibusdam voluptatem dolore numquam fugit impedit autem aliquid sint</span>
<span class="line_wrapper">            totam magnam quod ducimus ratione aliquam? Autem, ut? Quasi veritatis voluptas asperiores at</span>
<span class="line_wrapper">            ipsa suscipit distinctio tempore exercitationem culpa nihil, doloremque aliquid molestiae aut</span>
<span class="line_wrapper">            animi quisquam repellat<span style="color:#008c00; ">.</span> Quidem voluptatum, quisquam perspiciatis exercitationem explicabo</span>
<span class="line_wrapper">            accusamus vero quaerat dolorum cum blanditiis architecto eaque libero laudantium suscipit</span>
<span class="line_wrapper">            numquam labore facere maiores velit praesentium harum sunt vitae saepe! Blanditiis, officiis</span>
<span class="line_wrapper">            ex assumenda fuga atque iure est repudiandae? Unde totam expedita, dignissimos sequi fuga id</span>
<span class="line_wrapper">            iusto quisquam quis possimus, mollitia atque accusantium suscipit eos explicabo fugiat neque</span>
<span class="line_wrapper">            corporis laboriosam reiciendis earum nobis! Vero fugit culpa veniam quidem, consequuntur qui</span>
<span class="line_wrapper">            dolor ea sint, cumque ipsa praesentium quas vitae ut hic enim, illo error minima beatae quasi</span>
<span class="line_wrapper">            necessitatibus<span style="color:#008c00; ">.</span> Similique possimus unde, aspernatur culpa maiores qui natus eos optio</span>
<span class="line_wrapper">            cupiditate debitis aperiam sit exercitationem dicta, cum molestiae perferendis necessitatibus</span>
<span class="line_wrapper">            tenetur voluptatum<span style="color:#008c00; ">.</span> Aperiam maiores at eveniet sit modi pariatur culpa repellendus eius veniam</span>
<span class="line_wrapper">            et cumque laborum alias eos cum, ullam doloremque totam fugiat in voluptatibus consectetur</span>
<span class="line_wrapper">            distinctio temporibus nostrum qui quos<span style="color:#008c00; ">.</span> Molestiae cupiditate delectus illum quaerat, hic</span>
<span class="line_wrapper">            assumenda itaque in iure nobis placeat consequuntur consequatur<span style="color:#008c00; ">.</span> Odio, corporis molestiae!</span>
<span class="line_wrapper">            Illum, dolores fuga sint ea praesentium dignissimos optio iste earum veritatis doloribus</span>
<span class="line_wrapper">            voluptates aliquam? Eum voluptatibus non quasi explicabo voluptatum molestias est, repellat</span>
<span class="line_wrapper">            ullam, porro pariatur, atque consequuntur quae ipsa adipisci! Ex, libero modi<span style="color:#008c00; ">.</span> Aut dolorem</span>
<span class="line_wrapper">            optio excepturi distinctio praesentium velit dicta amet, ipsam, sequi officia, consequatur</span>
<span class="line_wrapper">            dolores reprehenderit veritatis fugit voluptas enim debitis veniam voluptatum id sit<span style="color:#008c00; ">.</span> Iure</span>
<span class="line_wrapper">            error tempora, doloremque, officiis voluptatum voluptate enim quo aliquam minus totam omnis</span>
<span class="line_wrapper">            alias perferendis voluptatibus necessitatibus repellat ipsam? Velit sapiente deserunt eveniet</span>
<span class="line_wrapper">            provident quod et, non molestias corporis modi totam tenetur maiores inventore in suscipit</span>
<span class="line_wrapper">            perferendis eum<span style="color:#008c00; ">.</span> Sed quisquam quasi tempore? Ea voluptate debitis labore nesciunt dolores<span style="color:#008c00; ">.</span></span>
<span class="line_wrapper">            Blanditiis molestiae, iste amet suscipit quis repellat rem ullam, iure provident accusantium</span>
<span class="line_wrapper">            optio voluptas sed reiciendis dolorum facere<span style="color:#008c00; ">.</span> Deserunt laborum porro ratione recusandae illo</span>
<span class="line_wrapper">            fugiat fugit atque maxime quisquam optio distinctio quos nostrum accusantium quaerat facere</span>
<span class="line_wrapper">            est quod tenetur, excepturi ut hic explicabo nam? Explicabo culpa nulla totam, sit error</span>
<span class="line_wrapper">            officiis nemo nihil fuga sapiente odit maiores alias<span style="color:#008c00; ">.</span> Eos hic ex perspiciatis consequuntur</span>
<span class="line_wrapper">            quas exercitationem nostrum fuga officia corrupti quis dolor consectetur beatae labore,</span>
<span class="line_wrapper">            reprehenderit non voluptates! Voluptatem exercitationem sapiente recusandae autem eum nobis</span>
<span class="line_wrapper">            tenetur quam vero dolorem, libero harum nam dolorum? Reiciendis quo doloremque neque</span>
<span class="line_wrapper">            cupiditate debitis ut a ex assumenda harum corporis iste ullam consequatur tempore eveniet ab</span>
<span class="line_wrapper">            porro, voluptatum, aliquam, tempora saepe quisquam atque nostrum? Asperiores quo hic rerum</span>
<span class="line_wrapper">            molestias dolorem earum, quae illo! Eos perspiciatis culpa perferendis autem facilis</span>
<span class="line_wrapper">            voluptatibus ut expedita voluptates alias<span style="color:#008c00; ">.</span> Est laudantium similique iure quisquam unde error</span>
<span class="line_wrapper">            commodi reiciendis blanditiis repudiandae, molestias tempore vel repellendus, nisi aliquam</span>
<span class="line_wrapper">            corporis architecto cum quia modi provident dolores<span style="color:#008c00; ">.</span> Facere magni eum maxime ipsum soluta</span>
<span class="line_wrapper">            accusantium perspiciatis, alias aliquid ab quia rerum cumque, sint illo fugiat quam!</span>
<span class="line_wrapper">            Doloremque, delectus minima<span style="color:#008c00; ">.</span> Molestiae esse adipisci asperiores quia eaque recusandae itaque</span>
<span class="line_wrapper">            repellendus est illum, aut facilis nam, maxime aliquid dignissimos nihil saepe, a dolore</span>
<span class="line_wrapper">            veniam hic blanditiis ullam doloribus et sunt numquam<span style="color:#008c00; ">.</span> Accusamus alias, atque, ratione, veniam</span>
<span class="line_wrapper">            corporis inventore commodi deleniti id obcaecati veritatis corrupti at vero vel? Nisi totam</span>
<span class="line_wrapper">            nulla culpa ipsam! Dicta, ad eligendi, molestiae eos voluptatum, architecto non excepturi eius</span>
<span class="line_wrapper">            neque vero consequatur? Nostrum iure praesentium sequi<span style="color:#008c00; ">.</span> Sapiente consectetur veniam mollitia</span>
<span class="line_wrapper">            doloremque tempore rerum eveniet deleniti, modi fugit ad reprehenderit aspernatur blanditiis</span>
<span class="line_wrapper">            quis perferendis quod natus! Dolor saepe repellendus placeat sunt, eveniet deleniti, eum</span>
<span class="line_wrapper">            fugiat, quaerat sequi a veritatis ut ex architecto maiores iure consequuntur officiis<span style="color:#008c00; ">.</span> Cum</span>
<span class="line_wrapper">            facilis nemo modi dolores id deleniti magnam architecto adipisci amet dolor ab accusantium,</span>
<span class="line_wrapper">            ad, necessitatibus, tempora expedita? Atque voluptas suscipit tenetur sit<span style="color:#008c00; ">.</span> Deleniti</span>
<span class="line_wrapper">            necessitatibus eveniet id cumque iusto debitis quos fugit aliquam sint sapiente laborum</span>
<span class="line_wrapper">            quibusdam molestias eius ipsa inventore, vel, sequi modi maxime totam pariatur, adipisci</span>
<span class="line_wrapper">            itaque quidem eaque? Inventore facilis ex recusandae dolorum vel unde exercitationem! Veniam</span>
<span class="line_wrapper">            deleniti reiciendis nisi ipsum eligendi praesentium tenetur pariatur cum dolores doloribus<span style="color:#008c00; ">.</span></span>
<span class="line_wrapper">            Facilis laboriosam expedita eius a, exercitationem sequi dolor saepe in nihil molestias minus,</span>
<span class="line_wrapper">            quasi dolore quam officia unde aliquam aspernatur optio corrupti, magni dolores asperiores</span>
<span class="line_wrapper">            esse voluptas veritatis! Nesciunt ab aliquam laboriosam sit officia quas odio illum rem<span style="color:#008c00; ">.</span></span>
<span class="line_wrapper">            Blanditiis illo fuga eos, et mollitia consequuntur labore ex, culpa nobis numquam, provident</span>
<span class="line_wrapper">            illum<span style="color:#008c00; ">.</span> Officiis quod animi, architecto accusantium fuga assumenda esse ullam molestiae</span>
<span class="line_wrapper">            blanditiis nemo eius ipsam incidunt tempore dignissimos ipsa quam, magni expedita<span style="color:#008c00; ">.</span> Commodi</span>
<span class="line_wrapper">            perspiciatis, consectetur nisi fugiat, repudiandae rerum earum aut praesentium dolore quis</span>
<span class="line_wrapper">            consequatur<span style="color:#008c00; ">.</span> Nihil fugiat, rerum quis ducimus consectetur quos repellendus sunt? Ut quos ipsum</span>
<span class="line_wrapper">            nulla facere sapiente voluptatem consectetur, commodi deserunt ab dolor nisi aut dolorem</span>
<span class="line_wrapper">            maxime possimus necessitatibus reiciendis vitae totam tempore est reprehenderit nihil nobis</span>
<span class="line_wrapper">            natus<span style="color:#008c00; ">.</span> Molestias sunt odit sint<span style="color:#008c00; ">.</span> Enim eligendi ex, doloremque aliquam, facilis animi officiis</span>
<span class="line_wrapper">            alias obcaecati, dignissimos fugit ad magnam<span style="color:#008c00; ">.</span> Deleniti facilis nihil eveniet voluptatum eius</span>
<span class="line_wrapper">            est id beatae odit officia perferendis laudantium labore cum quo, quos ipsam, ratione</span>
<span class="line_wrapper">            repudiandae sed expedita itaque minus ut dignissimos aliquid? Eaque, quibusdam harum maiores</span>
<span class="line_wrapper">            praesentium necessitatibus dicta quae aspernatur saepe ad, eligendi provident qui<span style="color:#008c00; ">.</span> Ipsa at</span>
<span class="line_wrapper">            doloremque saepe rem aspernatur harum repellat soluta iusto, quae repudiandae magnam nemo<span style="color:#008c00; ">.</span></span>
<span class="line_wrapper">            Deserunt repellat quae at hic mollitia sunt fuga qui nobis ex, amet odit quod, nostrum neque</span>
<span class="line_wrapper">            magni similique culpa molestias alias illum<span style="color:#008c00; ">.</span> Aliquam aperiam expedita enim perferendis vel!</span>
<span class="line_wrapper">            Quaerat, culpa? Consequatur possimus quo molestiae, distinctio nesciunt aspernatur, unde</span>
<span class="line_wrapper">            numquam nam ipsum laudantium illum aut accusamus ipsa officia iusto suscipit aliquid</span>
<span class="line_wrapper">            voluptatum quaerat enim sed ratione sit porro ad cumque? Modi necessitatibus atque nulla</span>
<span class="line_wrapper">            labore cupiditate totam, pariatur commodi aperiam voluptates laboriosam vel accusantium error</span>
<span class="line_wrapper">            doloribus placeat architecto repellat nihil, non recusandae quibusdam quas, exercitationem at</span>
<span class="line_wrapper">            hic! Delectus fugit tenetur cumque similique adipisci blanditiis ipsum obcaecati deleniti</span>
<span class="line_wrapper">            expedita atque non repudiandae minus, dolore accusamus recusandae, ducimus asperiores repellat</span>
<span class="line_wrapper">            nobis hic exercitationem voluptates<span style="color:#008c00; ">.</span> Neque labore cupiditate dolorum quibusdam dolorem</span>
<span class="line_wrapper">            perspiciatis iure voluptatibus sed officiis voluptate! Laborum in, delectus voluptatem omnis</span>
<span class="line_wrapper">            porro quidem quaerat? Ducimus maiores porro error dolorum eveniet possimus magni fugiat natus</span>
<span class="line_wrapper">            obcaecati, minima ea adipisci expedita atque illo eligendi iure ad repellat iusto excepturi<span style="color:#008c00; ">.</span></span>
<span class="line_wrapper">            Neque ab ipsa error consequatur fugiat id sit distinctio<span style="color:#008c00; ">.</span> Perspiciatis alias ipsam laboriosam?</span>
<span class="line_wrapper">            Dolores labore, cumque voluptate eligendi molestiae possimus ex nostrum esse corrupti</span>
<span class="line_wrapper">            praesentium saepe a sint minima ad nulla quisquam nesciunt laudantium! Consectetur, molestiae</span>
<span class="line_wrapper">            doloremque<span style="color:#008c00; ">.</span> Earum, qui<span style="color:#008c00; ">.</span></span>
<span class="line_wrapper">        <span style="color:#a65700; ">&lt;/</span><span style="color:#800000; font-weight:bold; ">p</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper">    <span style="color:#a65700; ">&lt;/</span><span style="color:#800000; font-weight:bold; ">body</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper"><span style="color:#a65700; ">&lt;/</span><span style="color:#800000; font-weight:bold; ">html</span><span style="color:#a65700; ">&gt;</span></span>
<span class="line_wrapper"></span></pre>

</details>

---

✍️ **Người soạn:** Phạm Xuân Hoài<br/>
📚 **Chủ đề:** HTML cơ bản<br/>

_Chúc bạn học tốt và hoàn thành bài tập thật xuất sắc!_
