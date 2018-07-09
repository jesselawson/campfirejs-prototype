// TaoJS A tiny little testing tool for other tiny little tools
// Written by Jesse Lawson <jesse@lawsonry.com>
// https://www.github.com/lawsonry/taojs

function tao( params ) {
    var report = ""
    report += "<h1 class=\"header\">☯ tao.js test report</h1><p><strong>Starting Tests</strong></p>"
    var totalTests = 0
    var passing = 0
    var failing = 0
    for(var t = 0; t < params.length; t++) {
        totalTests++
        report += "<div class=\"test-block\"><p class=\"parent-test\">Test #"+(t+1)+". Given <u>"+params[t].given+"</u> "
        var outerError = null
        try { params[t].by() } catch(error) { outerError = error }
        
        if(outerError) {
            report += '(<span class="fail" style="color: darkred">failed ✗</span>: <em>'+outerError+'</em>)</p>'
            failing++
        } else {
            report += '(<span class="pass" style="color: darkgreen">passed ✔</span>)</p>'
            passing++
        }

        report += "<ol>"

        for(var u=0; u < params[t].then.length; u++) {
            
            let innerTest = "<li><u>" + params[t].then[u].well + "</u>... "
            
            var result = null
            var theError = null
            try { result = params[t].then[u].because() } catch(error) { theError = error }
            
            if(result) {
                innerTest += '<span class="pass" style="color: darkgreen">passed ✔</span></li>'
                passing++
                totalTests++
            } else {
                innerTest += '<span class="fail" style="color: darkred">failed ✗</span><br/><em>'+theError+'</em></li>'
                failing++
                totalTests++
            }
            report += innerTest
            
        }

        report += "</ol></div>"
        
    }
    report += "<p><strong>Finishing Tests</strong></p><pre>"+totalTests+" total tests<br/>"+passing+" passing ✌<br/>"+failing+" failing ☠</pre>"
    var e = document.getElementById('tao')
    e.innerHTML = report
}