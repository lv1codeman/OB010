function getCourseData() {
    var year = $('#year').find(':selected').text();
    var semester = $('#semester').find(':selected').text();
    var dataJSON = {};
    dataJSON["year"] = year;
    dataJSON["semester"] = semester;
    $('*').css('cursor', 'wait');
    $('*').css('pointer-events', 'none');
    $('#hint').text('正在從OB010讀取資料(約需15秒左右等待時間)...');
    $('#hint').css('color', 'orange');
    console.log('start gathering data...')
    $.ajax({
        url: '/getdata',
        type: 'POST',
        data: JSON.stringify(dataJSON), // 将JavaScript对象转换为JSON字符串
        contentType: "application/json; charset=utf-8", // 指定请求内容类型为JSON
        dataType: "json", // 指定响应数据类型为JSON
        success: function (data) {
            console.log(data.message + data.executeTime);
            $('*').css('cursor', 'auto');
            $('*').css('pointer-events', 'auto');
            $('button').css('cursor', 'pointer');
            $('#hint').css('color', 'green');
            $('#hint').text('已從OB010讀取所有課程，共花費' + data.executeTime + '秒。');
            console.log(' 已從OB010讀取所有課程，共花費' + data.executeTime + '秒。');
            $('#dataTimeIndicator').text('目前資料為' + year + '-' + semester);
        },
        error: function (xhr, status, error) {
            var errorMessage = xhr.status + ': ' + xhr.statusText;
            $('#result').text('Error: ' + errorMessage);
        }
    });
}