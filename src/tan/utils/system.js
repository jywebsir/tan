class System {
	static systemInfo = null

	static getSystemInfoSync() {
		if (!this.systemInfo) {
			this.systemInfo = wx.getSystemInfoSync()
		}

		return this.systemInfo
	}
}

export default System