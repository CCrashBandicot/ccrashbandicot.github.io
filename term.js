// Fuck You 

window.onkeypress = function(){
 var text_input = document.getElementsByName("term")[0];
 text_input.focus();
}



var sh = document.getElementById("sh");
sh.innerHTML = ps1();

function ps1(){
 var ps = "Crash<font color='yellow'>@</font><font color='white'>DosPerl</font> % ";
 return ps;
}

function check_key(x){
 if(x.keyCode == 13)
  command();
 return true;
}

function dir_exist(dir_name){
 for(var i=0; i < dirs.length; i++)
  if(dirs[i] == dir_name)
    return true;

 return false;
}

function cat(y, filename){
 for(var i = 0; i < file_list.length; i++){
  if(file_list[i][0] == pwd && !file_list[i][1] && file_list[i][2] == filename){
   y.innerHTML += file_list[i][4];
    if(file_list[i][5] != ""){
     window.open(file_list[i][5], '_blank');
    }
  }
 }
}

function cd(y, path){
 if(path == "~"){
  pwd = '/home/crash';
  return;
 } else if(path == "/"){
                y.innerHTML += "permission denied<br/>";
                return;
        } else if(path == ".."){
                if(pwd == "/home/crash"){
                        y.innerHTML += "permission denied<br/>";
                } else {
                        var arr = pwd.split("/");
                        arr.splice(-1, 1);
                        pwd = arr.join("/");
                }
                return;
        }

        path = path.replace(/\/$/, "");

        var patt = /^\//;

        if(!patt.test(path)){
                path = pwd + '/'+path;
        }

        if(dir_exist(path)){
                pwd = path;
        }

}

function ls(y){
        for(var i = 0; i < file_list.length; i++) {
                if(file_list[i][0] == pwd){
                        if(file_list[i][1] == 1)
                                y.innerHTML += "d";
                        else
                                y.innerHTML += "-";

                        y.innerHTML += "r--r--r--   ";
                        y.innerHTML += file_list[i][3]+" ";
                        y.innerHTML += file_list[i][2]+"<br/>";
                }
        }

}

function command(){
        var x = document.getElementsByName("term")[0].value;
        var y = document.getElementById("xterm");

        x = x.replace(/</g, "&#60;");
        x = x.replace(/>/g, "&#62;");

        var cmd = x.split(" ");

        y.innerHTML += x + "<br/>";

        if(x == "whoami"){
                y.innerHTML += "NT AUTHORITY\SYSTEM<br/>";
        }

	else if(x == "clear"){
                y.innerHTML = "";
        }

	else if(x == "uname -a"){
		y.innerHTML += "Linux github.io 2.4.24-custom-grsec #1 mar jan 6 22:29:56 CET 2015 i686 <br/>";
	}

        else if(x == "uname"){
		y.innerHTML += "Linux";
	}
        else if(x == "help"){
                y.innerHTML += "available commands: ls, uname, cat, pwd, cd, whoami, id, exit<br/>";
        }

        else if(x == "pwd"){
                y.innerHTML += pwd+"<br/>";
        }

        else if(x == "id"){
                y.innerHTML += "uid=0(root) gid=0(root) groups=48(apache)<br/>";
        }

        else if(x == "exit"){
                window.location='http://thatsthefinger.com/';
        }

        else if(cmd[0] == "ls"){
                ls(y);
        }

        else if(cmd[0] == "cd"){
                if(cmd[1] !== undefined)
                        cd(y, cmd[1]);
        }

        else if(cmd[0] == "cat"){
                if(cmd[1] !== undefined)
                        cat(y, cmd[1]);
        }

        else if(x == ""){

        }

        else {
                y.innerHTML += "unknown command: "+x+"<br/>";
        }

        y.innerHTML += "<div id=\"sh\">"+ps1()+"</div>";
        document.getElementsByName("term")[0].value = '';

        window.scrollTo(0,document.body.scrollHeight);

 return true;
}


