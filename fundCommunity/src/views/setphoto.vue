<template>
	<div class="main-wrapper">
		<div class="page-header">
			<div class="back-arrow"  @click="goBack">
				<image class="back-arrow-image" :src="imgUrl+'back.png'"></image>
			</div>
			<div class="header-separator"></div>
			<div class="header-title">
				<text class="header-title-text">返回</text>
			</div>
		</div>
		<div class="image-view">
			<scroller style="flex: 1;">
			<div class="avatar-backimg">
				<image :src="imgUrl+'setphoto_bg.png'" class="avatar-gussi"></image>
			</div>
			<!-- <image :src="imgUrl+'user_photo.png'" class="avatar-img"></image> -->
			<div class="user-img">
				<image :src="imgUrl+'user_photo.png'" class="avatar-img"></image>
			</div>
			<div class="user-memo">
				<text class="memo-text">weex就是个坑！！！！</text>
			</div>
			</scroller>
		</div>
		<div class="btn-container">
			<div class="btn-photo" @click="goToPhotos">
				<text class ="btn-photo-text">从相册选择</text>
			</div>
			<div class="btn-photo">
				<text class ="btn-photo-text">拍照</text>
			</div>
		</div>
	</div>
</template>


<style>
	.main-wrapper{
		margin: 0;
		padding: 0;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: white;
		display: flex;
		flex-direction: column;
	}
	.page-header{
		flex: 1;
		background-color: #f5f5f9;
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.back-arrow{
		margin-left: 20px;
	}
	.back-arrow-image{
		margin-left: 20px;
		width: 60px;
		height: 60px;
	}

	.header-separator{
		width: 4px;
		height: 42px;
		margin-left: 20px;
		background-color: rgba(128, 128, 128, 0.5);
	}
	.header-title{
		margin-left: 20px;
	}
	.header-title-text{
		font-size: 36px;
	}

	.image-view{
		flex: 7;
		background-color: rgb(60, 118, 61,0.6);
		/*display: flex;
        align-items:flex-start;*/
	}
	.avatar-backimg{
		justify-content:center;
        align-items:center;
        /*position: fixed;*/
	}
    .avatar-gussi{
        width:750px;
        height:562px;
        background-size: cover;
        -webkit-filter: blur(5px);
        -moz-filter: blur(5px);
        -o-filter: blur(5px);
        -ms-filter: blur(5px);
        filter: blur(5px);
    }
    
	.user-img{
        background-color: rgba(255,255,255,0);
        justify-content:center;
        align-items:center;
        margin-top: -100px;
	}
	.avatar-img{
        width:200px;
        height:200px;
        border-radius:20px;
        border-color:white;
        border-style: solid;
        border-width:5px;
        background-color: white;
        /*position: fixed;
        left: 100px;
        right: 100px;
        top: 600px;*/
    }
    .user-memo{
    	margin-top: 20px;
    	justify-content:center;
        align-items:center;
    }
    .memo-text{
    	font-size: 32px;
    	color: #929292;
    }

	.btn-container{
		flex: 2;
		background-color: rgb(245, 245, 249,0.6);
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		margin-bottom: 20px;
		margin-left: 20px;
		margin-top: 20px;
		margin-right: 20px;
		padding-top: 20px;
		padding-bottom: 20px;
	}
	.btn-photo{
		flex: 1;
		width: 650px;
		margin-top: 30px;
		border-width: 2px;
		border-style: solid;
		border-color: #DDDDDD;
		background-color: #1E90FF;
		border-radius:15px;
		text-align: center;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
	}
	.btn-photo:active {
		background-color: #9bcdfa;
	}
	.btn-photo-text{
		font-size: 36px;
		text-align: center;
		color:white;
		padding-top: 10px;
		padding-bottom: 10px;
		text-align: center;
	}

</style>

<script>
	import apiURL from '../common/api';
	const modal = weex.requireModule('modal');
	var event = weex.requireModule('event');
	export default {
		data (){
			return {
				imgUrl:apiURL.imgUrl
			}
		},
		methods:{
			goBack:function(){
				this.$router.back();
			},
			goToPhotos:function (msg, okTitle, cancelTitle) {
				if (!msg || typeof msg !== 'string') {
					msg = "打开本地相册上传头像"
				}
				okTitle = okTitle || "OK"
				cancelTitle = cancelTitle || "Cancel"
				modal.confirm({
					'message': msg,
					'okTitle': okTitle,
					'cancelTitle': cancelTitle
				}, function(result) {
					console.log(result);
					modal.toast({ message: "Click Confirm  " + JSON.stringify(result),duration: 0.8 })
					if("OK"==result){
						event.uploadimage();
					}
				})
			}
		}
	}

</script>