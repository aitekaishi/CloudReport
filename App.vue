<script>
	import * as leanCloud from 'leancloud-storage/dist/av-weapp.js';
	export default {
		onLaunch: function() {
			console.log('App Launch')
			leanCloud.init("owhqBCubsgshUfDB2QquG5zS-gzGzoHsz", "EJsmLvPmLhokE6FJglO45dAM")
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
	}
</script>

<style>
	/*每个页面公共css */
</style>
