$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
})

$(function() {
    $('#submit').on('click', function() {
        
        // 驗證
        if ($('#userMail').val().search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/) != -1 && $('#section').val() != null && $('#position').val() != null && $('#userName').val() != null && $('#session_select').val() != null && document.getElementById('accCheckbox').checked) {
            console.log("驗證成功");
            // 信箱
            var userMail = $('#userMail').val() || '未填寫';
            // && $('#accCheckbox').val() != 
            // 單位名稱
            var section = $('#section').val() || '未填寫';

            // 單位職稱
            var position = $('#position').val() || '未填寫';

            // 姓名
            var userName = $('#userName').val() || '未填寫';

            // 性別
            var sex = function() {
                var v;
                $('[name="sex_radio"]').each(function() {
                if($(this).prop('checked') === true) v = $(this).val();
                });
                return v;
            };

            // 飲食習慣
            var eat = function() {
                var v;
                $('[name="eat_radio"]').each(function() {
                if($(this).prop('checked') === true) v = $(this).val();
                });
                return v;
            };

            // 報名場次
            var session = $('#session_select').val() || '未填寫';
            // 判斷日期與地址
            var date = "";
            var address = "";
            if (session=="北") {
                date = "109年6月17日(三)";
                address = "南港軟體園區國際會議中心A棟2樓會議室(台北市南港區三重路19-10號A棟2樓)";
            } else if (session=="中") {
                date = "109年6月24日(三)";
                address = "蓮潭國際會館國際二廳會議室(高雄市左營區崇德路801號)";
            } else if (session=="南") {
                date = "109年7月7日(二)";
                address = "台中工業區服務中心人才培訓中心會議室(台中工業區27路17號3樓）";
            }

            // 備註
            var remarks = $('#remarks_textarea').val() || '未填寫';

            // 傳送至表單
            var data = {
                'entry.2042082732': userMail,
                'entry.257531381': section,
                'entry.123054719': position,
                'entry.1802611064': userName,
                'entry.3992845': sex,
                'entry.277620602': eat,
                'entry.1396436476': session,
                'entry.1867475675': remarks
            };
            $.ajax({
                type: 'POST',
                url: 'https://docs.google.com/forms/d/e/1FAIpQLScX5RecUWz4ppgE6sP4OlOKA2GU6dyy82qHBpqYlMorIutCUw/formResponse',
                data: data,
                contentType: 'application/json',
                dataType: 'jsonp',
                complete: function(data) {
                    console.log("表單傳送成功");

                    // 寄送確認信
                    emailjs.init("user_B7Nb9TpDYHuihhajCCfIq");
                    let templateParams = {
                        "userMail": userMail,
                        "userName": userName,
                        "section": section,
                        "position": position,
                        "date": date,
                        "address": address
                    }
                    var service_id = "default_service";
                    var template_id = "industrialparkregistration";
                    emailjs.send(service_id, template_id, templateParams)
                    .then((response) => {
                        console.log('確認信寄送成功', response.status, response.text);
                        // 跳轉完成頁面
                        $('#mainPage').addClass("d-none");
                        $('#finalPage').removeClass("d-none");
                    })
                    .catch((error) => {
                        console.log('確認信寄送失敗', error);
                        alert("確認信寄送失敗，請重新填寫或連繫承辦人員，非常抱歉。");
                        window.location.reload();
                    })
                }
            });
        } else {
            console.log("驗證失敗");
        }
    });
});
