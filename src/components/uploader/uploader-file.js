import { immerable } from 'immer'
import { isImageUrl, isVideoUrl, isBoolean } from '../../utils/validator'

const STATUS_UPLOADING = 'uploading'
const STATUS_FAILED = 'failed'
const TYPE_IMAGE = 'image'
const TYPE_VIDEO = 'video'

class UploaderFile {
	[immerable] = true

	constructor({
		url,
		size,
		name,
		type,
		duration,
		time,
		thumb,
		status,
		deletable,
		message,
		autoplay,
		isVideo,
		isImage
	}) {
		this.url = url
		this.thumb = thumb
		this.size = size
		this.name = name
		this.type = type
		this.duration = duration
		this.time = time
		this.status = status
		this.message = message
		this.deletable = deletable
		this.autoplay = autoplay

		if (isBoolean(isImage)) {
			this.isImage = isImage
		}else if (this.type) {
			this.isImage = this.type === TYPE_IMAGE
		}else if (this.url) {
			this.isImage = isImageUrl(this.url)
		}

		if (isBoolean(isVideo)) {
			this.isVideo = isVideo
		}else if (this.type) {
			this.isVideo = this.type === TYPE_VIDEO
		}else if (this.url) {
			this.isVideo = isVideoUrl(this.url)
		}

		if (isBoolean(deletable)) {
			this.deletable = deletable
		}else {
			this.deletable = true
		}
	}

	get isUploading() {
		return this.status === STATUS_UPLOADING
	}

	get isFailed() {
		return this.status === STATUS_FAILED
	}
}

export default UploaderFile