
class Utils {
    static isDev () {
        return window.location.href.startsWith('https')
    }
}

export default Utils