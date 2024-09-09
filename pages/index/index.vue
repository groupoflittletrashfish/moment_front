<template>
	<view class="content">
		<view class="left">
			<view v-for="(item,index) in list" :key="index">
				<pubuliu-list v-if="index% 2==0" :url="item.url" :num="item.num" :title="item.title" :name="item.name"
					:avatar="item.avatar"></pubuliu-list>
			</view>
		</view>
		<view class="right">
			<view v-for="(item,index) in list" :key="index">
				<pubuliu-list v-if="index% 2==1" :url="item.url" :num="item.num" :title="item.title" :name="item.name"
					:avatar="item.avatar"></pubuliu-list>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		queryAllMoment
	} from '../../service/api/moment'


	export default {
		mounted() {
			queryAllMoment().then(data => {
				this.list = data
			})
		},
		data() {
			return {
				windowHeight: uni.getSystemInfoSync().windowHeight,
				list: [{
						name: '苏苏',
						num: '1',
						title: '测试数据测试测试测试测测试数据测试测试测试测测试数据测试测试测试测测试数据测试测试测试测',
						url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.zzvips.com%2Fuploads%2Fallimg%2F200814%2F22561WD0-1.jpg&refer=http%3A%2F%2Fwww.zzvips.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1670401688&t=f8d42fb514adadf898bd491098f37046',
						avatar: 'https://image.baidu.com/search/detail?ct=503316480&z=undefined&tn=baiduimagedetail&ipn=d&word=%E5%A5%BD%E7%9C%8B%E5%9B%BE%E7%89%87&step_word=&ie=utf-8&in=&cl=2&lm=-1&st=undefined&hd=undefined&latest=undefined&copyright=undefined&cs=3266055496,3131564151&os=2702451206,4095112865&simid=3266055496,3131564151&pn=0&rn=1&di=7146857200093233153&ln=1507&fr=&fmq=1667809443150_R&fm=&ic=undefined&s=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&is=0,0&istype=0&ist=&jit=&bdtype=0&spn=0&pi=0&gsm=1e&objurl=https%3A%2F%2Fgimg2.baidu.com%2Fimage_search%2Fsrc%3Dhttp%253A%252F%252Ftva1.sinaimg.cn%252Fmw690%252F007hackNly1g7hw1vdty9j30lo0engog.jpg%26refer%3Dhttp%253A%252F%252Ftva1.sinaimg.cn%26app%3D2002%26size%3Df9999%2C10000%26q%3Da80%26n%3D0%26g%3D0n%26fmt%3Dauto%3Fsec%3D1670401443%26t%3D82657a3b1a51501a158513d3cf52c5fd&rpstart=0&rpnum=0&adpicid=0&nojc=undefined&dyTabStr=MCwzLDEsNSw0LDgsNyw2LDIsOQ%3D%3D'
					},
					{
						name: '苏苏2',
						num: '1',
						title: '测试数据测试测试测试测测试数据测试测试测试测测试数据测试测试测试测测试数据测试测试测试测',
						url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ftva1.sinaimg.cn%2Fmw690%2F007hackNly1g7hw1vdty9j30lo0engog.jpg&refer=http%3A%2F%2Ftva1.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1670401721&t=063084b0cbfc8ed9c57a5187f856c4d4',
						avatar: 'https://image.baidu.com/search/detail?ct=503316480&z=undefined&tn=baiduimagedetail&ipn=d&word=%E5%A5%BD%E7%9C%8B%E5%9B%BE%E7%89%87&step_word=&ie=utf-8&in=&cl=2&lm=-1&st=undefined&hd=undefined&latest=undefined&copyright=undefined&cs=3266055496,3131564151&os=2702451206,4095112865&simid=3266055496,3131564151&pn=0&rn=1&di=7146857200093233153&ln=1507&fr=&fmq=1667809443150_R&fm=&ic=undefined&s=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&is=0,0&istype=0&ist=&jit=&bdtype=0&spn=0&pi=0&gsm=1e&objurl=https%3A%2F%2Fgimg2.baidu.com%2Fimage_search%2Fsrc%3Dhttp%253A%252F%252Ftva1.sinaimg.cn%252Fmw690%252F007hackNly1g7hw1vdty9j30lo0engog.jpg%26refer%3Dhttp%253A%252F%252Ftva1.sinaimg.cn%26app%3D2002%26size%3Df9999%2C10000%26q%3Da80%26n%3D0%26g%3D0n%26fmt%3Dauto%3Fsec%3D1670401443%26t%3D82657a3b1a51501a158513d3cf52c5fd&rpstart=0&rpnum=0&adpicid=0&nojc=undefined&dyTabStr=MCwzLDEsNSw0LDgsNyw2LDIsOQ%3D%3D'
					},
					{
						name: '苏苏3',
						num: '1',
						title: '测试数据测试测试测试测测试数据测试测试测试测测试数据测试测试测试测测试数据测试测试测试测',
						url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F1%2F55137f8c14f0d.jpg%3Fdown&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1670401743&t=273b63573c606b3c3fcfd6b0717ec92c',
						avatar: 'https://image.baidu.com/search/detail?ct=503316480&z=undefined&tn=baiduimagedetail&ipn=d&word=%E5%A5%BD%E7%9C%8B%E5%9B%BE%E7%89%87&step_word=&ie=utf-8&in=&cl=2&lm=-1&st=undefined&hd=undefined&latest=undefined&copyright=undefined&cs=3266055496,3131564151&os=2702451206,4095112865&simid=3266055496,3131564151&pn=0&rn=1&di=7146857200093233153&ln=1507&fr=&fmq=1667809443150_R&fm=&ic=undefined&s=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&is=0,0&istype=0&ist=&jit=&bdtype=0&spn=0&pi=0&gsm=1e&objurl=https%3A%2F%2Fgimg2.baidu.com%2Fimage_search%2Fsrc%3Dhttp%253A%252F%252Ftva1.sinaimg.cn%252Fmw690%252F007hackNly1g7hw1vdty9j30lo0engog.jpg%26refer%3Dhttp%253A%252F%252Ftva1.sinaimg.cn%26app%3D2002%26size%3Df9999%2C10000%26q%3Da80%26n%3D0%26g%3D0n%26fmt%3Dauto%3Fsec%3D1670401443%26t%3D82657a3b1a51501a158513d3cf52c5fd&rpstart=0&rpnum=0&adpicid=0&nojc=undefined&dyTabStr=MCwzLDEsNSw0LDgsNyw2LDIsOQ%3D%3D'
					},
					{
						name: '苏苏4',
						num: '1',
						title: '测试数据测试测试测试测测试数据测试测试测试测测试数据测试测试测试测测试数据测试测试测试测',
						url: 'https://img1.baidu.com/it/u=1052255644,1248205582&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800',
						avatar: 'https://image.baidu.com/search/detail?ct=503316480&z=undefined&tn=baiduimagedetail&ipn=d&word=%E5%A5%BD%E7%9C%8B%E5%9B%BE%E7%89%87&step_word=&ie=utf-8&in=&cl=2&lm=-1&st=undefined&hd=undefined&latest=undefined&copyright=undefined&cs=3266055496,3131564151&os=2702451206,4095112865&simid=3266055496,3131564151&pn=0&rn=1&di=7146857200093233153&ln=1507&fr=&fmq=1667809443150_R&fm=&ic=undefined&s=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&is=0,0&istype=0&ist=&jit=&bdtype=0&spn=0&pi=0&gsm=1e&objurl=https%3A%2F%2Fgimg2.baidu.com%2Fimage_search%2Fsrc%3Dhttp%253A%252F%252Ftva1.sinaimg.cn%252Fmw690%252F007hackNly1g7hw1vdty9j30lo0engog.jpg%26refer%3Dhttp%253A%252F%252Ftva1.sinaimg.cn%26app%3D2002%26size%3Df9999%2C10000%26q%3Da80%26n%3D0%26g%3D0n%26fmt%3Dauto%3Fsec%3D1670401443%26t%3D82657a3b1a51501a158513d3cf52c5fd&rpstart=0&rpnum=0&adpicid=0&nojc=undefined&dyTabStr=MCwzLDEsNSw0LDgsNyw2LDIsOQ%3D%3D'
					},
					{
						name: '苏苏5',
						num: '1',
						title: '测试数据测试测试测试测测试数据测试测试测试测测试数据测试测试测试测测试数据测试测试测试测',
						url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.capablist.com%2FCellFile%2Fmaga20200423%2F1585973557Xezseqgv.jpg&refer=http%3A%2F%2Fwww.capablist.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1670401763&t=1eed5f3cbc5699e9c0132c812f890ce7',
						avatar: 'https://image.baidu.com/search/detail?ct=503316480&z=undefined&tn=baiduimagedetail&ipn=d&word=%E5%A5%BD%E7%9C%8B%E5%9B%BE%E7%89%87&step_word=&ie=utf-8&in=&cl=2&lm=-1&st=undefined&hd=undefined&latest=undefined&copyright=undefined&cs=3266055496,3131564151&os=2702451206,4095112865&simid=3266055496,3131564151&pn=0&rn=1&di=7146857200093233153&ln=1507&fr=&fmq=1667809443150_R&fm=&ic=undefined&s=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&is=0,0&istype=0&ist=&jit=&bdtype=0&spn=0&pi=0&gsm=1e&objurl=https%3A%2F%2Fgimg2.baidu.com%2Fimage_search%2Fsrc%3Dhttp%253A%252F%252Ftva1.sinaimg.cn%252Fmw690%252F007hackNly1g7hw1vdty9j30lo0engog.jpg%26refer%3Dhttp%253A%252F%252Ftva1.sinaimg.cn%26app%3D2002%26size%3Df9999%2C10000%26q%3Da80%26n%3D0%26g%3D0n%26fmt%3Dauto%3Fsec%3D1670401443%26t%3D82657a3b1a51501a158513d3cf52c5fd&rpstart=0&rpnum=0&adpicid=0&nojc=undefined&dyTabStr=MCwzLDEsNSw0LDgsNyw2LDIsOQ%3D%3D'
					},
					{
						name: '苏苏6',
						num: '1',
						title: '测试数据测试测试测试测测试数据测试测试测试测测试数据测试测试测试测测试数据测试测试测试测',
						url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg1.doubanio.com%2Fview%2Fgroup_topic%2Fl%2Fpublic%2Fp269799607.jpg&refer=http%3A%2F%2Fimg1.doubanio.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1670401856&t=b132da2561c8ed03285c22671f4fd03b',
						avatar: 'https://image.baidu.com/search/detail?ct=503316480&z=undefined&tn=baiduimagedetail&ipn=d&word=%E5%A5%BD%E7%9C%8B%E5%9B%BE%E7%89%87&step_word=&ie=utf-8&in=&cl=2&lm=-1&st=undefined&hd=undefined&latest=undefined&copyright=undefined&cs=3266055496,3131564151&os=2702451206,4095112865&simid=3266055496,3131564151&pn=0&rn=1&di=7146857200093233153&ln=1507&fr=&fmq=1667809443150_R&fm=&ic=undefined&s=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&is=0,0&istype=0&ist=&jit=&bdtype=0&spn=0&pi=0&gsm=1e&objurl=https%3A%2F%2Fgimg2.baidu.com%2Fimage_search%2Fsrc%3Dhttp%253A%252F%252Ftva1.sinaimg.cn%252Fmw690%252F007hackNly1g7hw1vdty9j30lo0engog.jpg%26refer%3Dhttp%253A%252F%252Ftva1.sinaimg.cn%26app%3D2002%26size%3Df9999%2C10000%26q%3Da80%26n%3D0%26g%3D0n%26fmt%3Dauto%3Fsec%3D1670401443%26t%3D82657a3b1a51501a158513d3cf52c5fd&rpstart=0&rpnum=0&adpicid=0&nojc=undefined&dyTabStr=MCwzLDEsNSw0LDgsNyw2LDIsOQ%3D%3D'
					}
				]
			}
		}
	}
</script>

<style>
	.content {
		text-align: justify;
	}


	.left,
	.right {
		display: inline-block;
		vertical-align: top;
		width: 49%;
	}
</style>