const pageVideo = () => {
    let videoPath = 'videos/'
    const videoPlayer = document.getElementById('video-player')
    const videoSelect = document.getElementById('video-select')
    const videoContainer = document.getElementById('video-container')
    let lastTap = 0

    // event on selector
    videoSelect.addEventListener('change', () => {
        const selectedVideo = videoSelect.value
        videoPlayer.src = videoPath + selectedVideo
        videoPlayer.playbackRate = 1 // reset playback speed to normal when new video is selected
        videoPlayer.play()
        this.blur() // Remove focus from select after selection
        videoPlayer.focus() // Set focus to video player for keyboard shortcuts
    })

    // keyboard shortcuts
    document.addEventListener('keydown', (event) => {
        // Ignore if user typing in text field
        const tagName = event.target.tagName
        if (tagName === 'INPUT' || tagName === 'TEXTAREA' || tagName === 'SELECT') {
            return
        }

        if (event.code === 'Space') {
            if (document.activeElement === videoPlayer) {
                return // Don't toggle play/pause if space is pressed while focus is on video player (to allow default behavior of space key in video controls)
            }
            event.preventDefault()
            toggleVideoPlayback()
        } else if (event.code === 'ArrowRight') {
            event.preventDefault()
            videoForward()
        } else if (event.code === 'ArrowLeft') {
            event.preventDefault()
            videoBackward()
        } else if (event.code === 'KeyF') {
            event.preventDefault()
            pageBaseUi().toggleFullScreen(videoPlayer)
        } else if (event.code === 'ArrowUp') {
            // Increase playback speed by 0.25x, max 2x
            event.preventDefault()
            videoFast()
        } else if (event.code === 'ArrowDown') {
            event.preventDefault()
            videoSlow()
        }
    })


    // double-tap for mobile devices
    videoPlayer.addEventListener('touchend', (event) => {
        const currentTime = new Date().getTime()
        const tapLength = currentTime - lastTap
        const tapX = event.changedTouches[0].clientX
        const rect = videoPlayer.getBoundingClientRect()
        const videoWidth = rect.width
        const threshold = videoWidth * 0.3 // 30% of video width
        const videoCenterX = rect.left + videoWidth / 2
        if (tapLength < 300 && tapLength > 0) {
            event.preventDefault()

            if (tapX < videoCenterX - threshold) {
                // Double-tap on left side - skip backward
                videoBackward()
            } else if (tapX > videoCenterX + threshold) {
                // Double-tap on right side - skip forward
                videoForward()
            }
        } else if (tapX < videoCenterX + threshold && tapX > videoCenterX - threshold) {
            // Single tap centered - toggle play/pause
            toggleVideoPlayback()
        }
        lastTap = currentTime
    }, false)

    const provideVideoList = (videosList, videoBasePath = 'videos/') => {
        videoPath = videoBasePath
        videosList.forEach(video => {
            const option = document.createElement('option')
            option.value = video
            option.textContent = video
            videoSelect.appendChild(option)
        })
    }

    const actionToggleFullScreen = () => {
        pageBaseUi().toggleFullScreen(videoPlayer)
    }

    const toggleVideoPlayback = () => {
        if (videoPlayer.paused) {
            videoPlayer.play()
        } else {
            videoPlayer.pause()
        }
    }

    const videoBackward = () => {
        videoPlayer.currentTime -= 5 // skip backward 5 seconds
        showOverlay('⏪ -5s', 'left')
    }

    const videoForward = () => {
        videoPlayer.currentTime += 5 // skip forward 5 seconds
        showOverlay('⏩ +5s', 'right')
    }

    const videoSlow = () => {
        // Decrease playback speed by 0.25x, min 0.25x
        videoPlayer.playbackRate = Math.max(videoPlayer.playbackRate - 0.25, 0.25)
        const speedText = `x${videoPlayer.playbackRate.toFixed(2)}`
        showOverlay(speedText)
    }

    const videoFast = () => {
        // Increase playback speed by 0.25x, max 2x
        videoPlayer.playbackRate = Math.min(videoPlayer.playbackRate + 0.25, 2)
        const speedText = `x${videoPlayer.playbackRate.toFixed(2)}`
        showOverlay(speedText)
    }

    const showOverlay = (text, position) => {
        // function to show an overlay text on video
        const container = document.getElementById('video-container')
        const oldOverlay = document.getElementById('video-overlay')
        // remove existing overlay if any
        if (oldOverlay) oldOverlay.remove()

        const overlay = document.createElement('div')
        overlay.id = 'video-overlay'
        overlay.textContent = text

        if (position === 'left') {
            overlay.style.left = '5%'
        } else if (position === 'right') {
            overlay.style.right = '5%'
        } else {
            // supposed to be middle
            overlay.style.left = '50%'
            overlay.style.transform = 'translateX(-50%)'
            overlay.style.top = '5%'
        }

        videoContainer.appendChild(overlay)

        // Remove the overlay after a short delay
        setTimeout(() => {
            overlay.style.opacity = '0'
            setTimeout(() => overlay.remove(), 500)
        }, 800)
    }


    return {
        provideVideoList,
        actionToggleFullScreen,
        toggleVideoPlayback,
        videoBackward,
        videoForward,
        videoSlow,
        videoFast
    }
}
