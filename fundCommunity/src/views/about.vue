<template>
	<div class="about-wrapper">
		<div class="about-header">
			<div class="back-arrow"  @click="goBack">
				<image class="back-arrow-image" :src="imgUrl+'back.png'"></image>
			</div>
			<div class="header-separator"></div>
			<div class="header-title">
				<text class="header-title-text">返回</text>
			</div>
		</div>
		<div class="logo-container">
			<div class="logo-head">
				<image class="logo-img" :src="imgUrl+'fund_icon.png'"></image>
			</div>
			<div class="logo-title">
				<text class="logo-text">{{appName}}</text>
				<text class="logo-text">{{currentVersion}}</text>
			</div>
		</div>
		<div class="about-desc">
			<div class="version-desc">
				<div class="version-desc-head" @click="showVersion">
					<text class="desc-head-text">版本信息</text>
				</div>
				<div class="version-desc-detail" v-if="versionShow">
					<div class="version-desc-detail-item" v-for="versioninfo in versionInfoList" :key="versioninfo.index">
						<div class="change-date">
							<text class="change-date-text">{{versioninfo.date}}</text>
						</div>
						<div class="version-separator"></div>
						<div class="change-desc">
							<text class="desc-detail-text">{{versioninfo.version}}  {{versioninfo.modifylog}}</text>
						</div>
					</div>
				</div>
			</div>
			<div class="function-desc">
				<div class="function-desc-head" @click="showFuncDesc">
					<text class="desc-head-text">功能介绍</text>
				</div>
				<div class="function-desc-detail" v-if="funcDescShow">
					<text class="desc-detail-text">{{funcDesc}}</text>
				</div>
			</div>
		</div>
		<div class="about-foot">
			<text class="about-foot-text">© 2017 CMB Network Technology.All Rights Serve</text>
		</div>
	</div>
</template>

<style type="text/css">
	.about-wrapper { 
		margin: 0;
		padding: 0;
		/*width: 750px;*/
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: white;
	}
	.about-header{
		flex: 1;
		display: flex;
		flex-direction: row;
		align-items: center;
		border-bottom-style: solid;
    	border-bottom-width: 3px;
    	border-bottom-color: #f5f5f9;
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
	.logo-container{
		flex: 3;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		border-bottom-style: solid;
    	border-bottom-width: 3px;
    	border-bottom-color: #f5f5f9;
	}
	.logo-head{
		flex: 2;
		width: 750px;
		justify-content: center;
		align-items: center;
	}
	.logo-img{
		height: 200px;
		width: 200px;
	}
	.logo-title{
		flex: 1;
		width: 750px;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		display: flex;
	}
	.logo-text{
		flex: 1;
		font-size:36px;
		color: black; 
		font-weight: bold;
	}
	.about-desc{
		flex: 7;
		flex-direction: column;
		display: flex;
	}
	.version-desc{
		padding-left: 20px;
    	padding-top: 20px;
    	padding-bottom: 20px;
    	padding-right: 20px;
		border-bottom-style: solid;
    	border-bottom-width: 3px;
    	border-bottom-color: #f5f5f9;
	}
	.version-desc-head{
		height: 50px;
	}
	.desc-head-text{
		font-size: 36px;
	}
	.version-desc-detail{
		padding-left: 20px;
    	padding-top: 20px;
    	padding-bottom: 20px;
		background-color: #dff0d8;
    	border-color: #d6e9c6; 
    	border-radius: 10px;
	}
	.version-desc-detail-item{
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.change-date{
		padding-right: 20px;
	}
	.change-date-text{
		font-size: 28px;
		color: red;
	}
	.change-desc{
		padding-left: 20px;
	}
	.version-separator{
		width: 21px;
		height: 21px;
		border-radius: 100px;
		border-width: 2px;
		border-color: white;
		border-style: solid;
		background-color: #75ce66;
	}
	.desc-detail-text{
		color: #3c763d;
		text-align: left;
		font-size: 28px;
	}
	.function-desc{
		padding-left: 20px;
    	padding-top: 20px;
    	padding-bottom: 20px;
    	padding-right: 20px;
		border-bottom-style: solid;
    	border-bottom-width: 3px;
    	border-bottom-color: #f5f5f9;
	}
	.function-desc-detail{
		padding-left: 20px;
    	padding-top: 20px;
    	padding-bottom: 20px;
		background-color: #dff0d8;
    	border-color: #d6e9c6; 
    	border-radius: 10px;
	}
	.about-foot{
		flex: 1;
		padding-top: 10px;
		padding-bottom: 10px;
		justify-content: center;
		align-items: center;
	}
	.about-foot-text{
		font-size: 24px;
	}


</style>

<script type="text/javascript">
	import apiURL from '../common/api';
	export default {
		data(){
			return{
				imgUrl:apiURL.imgUrl,
				versionShow:true,
				funcDescShow:true,
				appName:"理财社区",
				currentVersion:"0.1.2",
				versionInfoList:[
					{
						version:"V0.1.0",
						modifylog:"基本功能",
						date:"2017.5.18"
					},
					{
						version:"V0.1.1",
						modifylog:"修复tabbar显示bug",
						date:"2017.6.10"
					}
				],
				funcDesc:"产品功能说明"
			}
		},
		methods:{
			goBack:function(){
				this.$router.back();
			},
			showVersion:function(){
				this.versionShow=!this.versionShow;
			},
			showFuncDesc:function(){
				this.funcDescShow=!this.funcDescShow;
			}
		}
	}

</script>