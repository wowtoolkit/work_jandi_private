const exec		= require('child_process').execSync;
const iconv		= require('iconv-lite');
const moment	= require('moment');
const fs		= require('fs');
/*
2022-09-10 오전 7:51
github 잔디 자동심기

찌꺼기파일 제거후 커밋하는 용도
*/
const start_time = moment().format('YYYY-MM-DD hh:mm:ss'); // 시작시간 변수에 담기

const dir_name = '@del';
make_folder(dir_name); // 폴더 생성
del_all_file(dir_name); // 해당폴더 내부 모든 파일 삭제

con('- - START - -');
cmd2txt_no_return('git add -A');
cmd2txt_no_return('git commit -m "delete trash file"');
cmd2txt('git push -f');



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