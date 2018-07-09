// TaoJS A tiny little testing tool for other tiny little tools
// Written by Jesse Lawson <jesse@lawsonry.com>
// https://www.github.com/lawsonry/taojs

function Print(string) {
    var e = document.getElementById('tao')
    e.innerHTML += string
}

function TestPassed() {
    return '<span class="pass" style="color: darkgreen">passed ✔</span>'
}

function TestFailed() {
    return '<span class="fail" style="color: darkred">failed ✗</span>'
}


function tao( params ) {
    var report = ""
    report += "<h1 class=\"header\">TaoJS Test Report</h1><p><strong>[ Tao.js ] Starting Tests</strong></p>"
    var totalTests = 0
    var passing = 0
    var failing = 0
    for(var t = 0; t < params.length; t++) {
        totalTests++
        report += "<div class=\"test-block\"><p class=\"parent-test\">Test #"+(t+1)+". Given <span style=\"text-decoration: underline\">"+params[t].given+"</span>:</p><ol>"
        try {
            params[t].by()
        } catch(error) {
            Print(error)
        }
        
        for(var u=0; u < params[t].then.length; u++) {
            let innerTest = "<li>" + params[t].then[u].well + "... "
            
            var result = null
            
            try {
                var result = params[t].then[u].because()
            } 
            catch(error) { Print(error); continue }
            
            if(result) {
                innerTest += TestPassed()+"</li>"
                passing++
            } else {
                innerTest += TestFailed()+"</li>"
                failing++
            }
            report += innerTest
            report += "</p></div>"
        }
        
    }
    report += "<p><strong>[ Tao.js ] Tests Complete</strong><br/>Tests Processed: "+totalTests+"<br/>Passing: "+passing+" ✌<br/>Failing: "+failing+" ☠</p>"
    Print(report)
}