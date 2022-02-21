const exec		= require('child_process').execSync;
const iconv		= require('iconv-lite');
const moment	= require('moment');
const fs		= require('fs');
/*
2022-09-10 오전 7:51
github 잔디 자동심기

+ 작업순서
깃허브 내계정 첫페이지의 'contribution setting' 에서 Private 클릭해서 활성화해둠
비공개 레포 생성
레포 깃허브 로컬로 가져오기 (git clone git주소 폴더명) 
nodejs 파일과 node_modules 복사해서 채워넣기
파일 실행

git commit --amend --no-edit --date="{Fri 26 Aug 2022 01:35:10 +0900}"
var cmd = 'ping -n 4 8.8.8.8';
var cmd = 'dir';
*/
const start_time = moment().format('YYYY-MM-DD hh:mm:ss'); // 시작시간 변수에 담기

const dir_name = '@del';
make_folder(dir_name); // 폴더 생성
del_all_file(dir_name); // 해당폴더 내부 모든 파일 삭제

con('- - START - -');
for(let j=0;j<1;j++)
{
	//for(let i=1;i<2190;i++)		// 6년치 = 2190 (365 X 6), 30분 소요 -> 깃허브에 반영안됨. 너무 많아서인가
	//for(let i=1;i<400;i++)		// 1-400 성공 7분 소요
	//for(let i=1;i<1000;i++)		// 1-1000 성공 13분 소요
	//for(let i=1000;i<2000;i++)	// 1000-2000 20분 소요
	//for(let i=2130;i<2446;i++)	// 
	for(let i=201;i<2446;i++)	// 
	{	
		if(i%200==0)
			cmd2txt('git push -f');
		if(i%10==0)
			con('- - ' + i + ' - -');
		var random_txt = get_random(1,999999);
		random_txt += '_'+get_random(1,999999);
		random_txt += '_'+get_random(1,999999);
		make_file('@del/'+random_txt+'.txt', '');
		cmd2txt_no_return('git add -A');
		cmd2txt_no_return('git commit -m "'+random_txt+'"');
		cmd2txt_no_return(return_commit_date(i*1));
		if(i%3==0)
		{
			random_txt += '_'+get_random(1,999999);
			make_file('@del/'+random_txt+'.txt', '');
			cmd2txt_no_return('git add -A');
			cmd2txt_no_return('git commit -m "'+random_txt+'"');
			cmd2txt_no_return(return_commit_date(i*1));
		}
		if(i%5==0)
		{
			random_txt += '_'+get_random(1,999999);
			make_file('@del/'+random_txt+'.txt', '');
			cmd2txt_no_return('git add -A');
			cmd2txt_no_return('git commit -m "'+random_txt+'"');
			cmd2txt_no_return(return_commit_date(i*1));
		}
		if(i%9==0)
		{
			random_txt += '_'+get_random(1,999999);
			make_file('@del/'+random_txt+'.txt', '');
			cmd2txt_no_return('git add -A');
			cmd2txt_no_return('git commit -m "'+random_txt+'"');
			cmd2txt_no_return(return_commit_date(i*1));

			random_txt += '_'+get_random(1,999999);
			make_file('@del/'+random_txt+'.txt', '');
			cmd2txt_no_return('git add -A');
			cmd2txt_no_return('git commit -m "'+random_txt+'"');
			cmd2txt_no_return(return_commit_date(i*1));
		}
		if(i%4==0)
		{
			random_txt += '_'+get_random(1,999999);
			make_file('@del/'+random_txt+'.txt', '');
			cmd2txt_no_return('git add -A');
			cmd2txt_no_return('git commit -m "'+random_txt+'"');
			cmd2txt_no_return(return_commit_date(i*1));
		}
	}
}
cmd2txt('git push -f');
const end_time = moment().format('YYYY-MM-DD hh:mm:ss');
con('start_time : ' + start_time);
con('end_time : ' + end_time);
/*
*/



/* make folder */
function make_folder(dir_name)
{
	if(!fs.existsSync("./"+dir_name))
	{
		fs.mkdirSync('./'+dir_name);
	}
}
/* del all files */
function del_all_file(dir_name)
{
	if(fs.existsSync("./"+dir_name))
	{
		 // 디렉토리내 파일목록 fileList 에 담기
		fs.readdir("./"+dir_name, (err, file_list) => 
		{
			//console.log(fileList);

			// 배열로 반복
			file_list.forEach(function(file_item,index,arr2)
			{ 
				//console.log(item,index,arr2[index+1]);
				//con(item);
				fs.unlink('./'+dir_name+'/'+file_item, function(err)
				{ 
					if(err) {
						console.log("Error : ", err)
					}
				});
			});
		});
	}
}

async function make_file(filename, data)
{
	await fs.writeFileSync(filename,data,function(err){
		if (err === null) {
			//console.log('success');
		} else {
			//console.log('fail');
		}
		fs.close(filename, function(){
			
		});
	});
	return false;
}

function return_commit_date(day_num)
{
	return 'git commit --amend --no-edit --date='+return_date(day_num)
}

function return_date(day_num)
{
	let txt = moment().subtract(day_num, 'days').format('YYYY-MM-DD hh:mm:ss')+' +0900';
	return '"{'+txt+'}"';
}


function cmd2txt(str)
{
	let get = exec(str);
	get = iconv.decode(get, 'euc-kr');
	con(get);
	return false;
}
function cmd2txt_no_return(str)
{
	let get = exec(str);
}

/* util */
function con(msg)
{
	console.log(msg);
}

function get_random(min, max)
{ 
	return Math.floor(Math.random() * (max - min)) + min;
}