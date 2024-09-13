const FUNC_ERROR_TEXT = 'Expected a function'

const NAN = 0 / 0

const symbolTag = '[object Symbol]'

const reTrim = /^\s+|\s+$/g

const reIsBadHex = /^[-+]0x[0-9a-f]+$/i

const reIsBinary = /^0b[01]+$/i

const reIsOctal = /^0o[0-7]+$/i

const freeParseInt = parseInt

const freeGlobal: any =
    typeof global === 'object' && global && global.Object === Object && global

const freeSelf: any =
    typeof self === 'object' && self && self.Object === Object && self

const root: any = freeGlobal || freeSelf || Function('return this')()

const objectProto = Object.prototype

const objectToString = objectProto.toString

const nativeMax = Math.max,
    nativeMin = Math.min

const now = () => {
    return root.Date.now()
}

export function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number,
    options?: { leading?: boolean; maxWait?: number; trailing?: boolean }
) {
    let lastArgs: any,
        lastThis: any,
        maxWait: number | undefined,
        result: any,
        timerId: ReturnType<typeof setTimeout> | undefined,
        lastCallTime: number | undefined,
        lastInvokeTime = 0,
        leading = false,
        maxing = false,
        trailing = true

    if (typeof func !== 'function') {
        throw new TypeError(FUNC_ERROR_TEXT)
    }
    wait = toNumber(wait) || 0
    if (isObject(options)) {
        leading = !!options?.leading
        maxing = 'maxWait' in options
        maxWait = maxing
            ? nativeMax(toNumber(options!.maxWait) || 0, wait)
            : maxWait
        trailing = 'trailing' in options ? !!options.trailing : trailing
    }

    function invokeFunc(time: number) {
        const args = lastArgs,
            thisArg = lastThis

        lastArgs = lastThis = undefined
        lastInvokeTime = time
        result = func.apply(thisArg, args)
        return result
    }

    function leadingEdge(time: number) {
        lastInvokeTime = time
        timerId = setTimeout(timerExpired, wait)
        return leading ? invokeFunc(time) : result
    }

    function remainingWait(time: number) {
        const timeSinceLastCall = time - lastCallTime!,
            timeSinceLastInvoke = time - lastInvokeTime,
            result = wait - timeSinceLastCall

        return maxing
            ? nativeMin(result, maxWait! - timeSinceLastInvoke)
            : result
    }

    function shouldInvoke(time: number) {
        const timeSinceLastCall = time - lastCallTime!,
            timeSinceLastInvoke = time - lastInvokeTime

        return (
            lastCallTime === undefined ||
            timeSinceLastCall >= wait ||
            timeSinceLastCall < 0 ||
            (maxing && timeSinceLastInvoke >= maxWait!)
        )
    }

    function timerExpired() {
        const time = now()
        if (shouldInvoke(time)) {
            return trailingEdge(time)
        }
        timerId = setTimeout(timerExpired, remainingWait(time))
    }

    function trailingEdge(time: number) {
        timerId = undefined

        if (trailing && lastArgs) {
            return invokeFunc(time)
        }
        lastArgs = lastThis = undefined
        return result
    }

    function cancel() {
        if (timerId !== undefined) {
            clearTimeout(timerId)
        }
        lastInvokeTime = 0
        lastArgs = lastCallTime = lastThis = timerId = undefined
    }

    function flush() {
        return timerId === undefined ? result : trailingEdge(now())
    }

    function debounced(this: any, ...args: any[]) {
        const time = now(),
            isInvoking = shouldInvoke(time)

        lastArgs = args
        lastThis = this
        lastCallTime = time

        if (isInvoking) {
            if (timerId === undefined) {
                return leadingEdge(lastCallTime ? lastCallTime : 0)
            }
            if (maxing) {
                timerId = setTimeout(timerExpired, wait)
                return invokeFunc(lastCallTime ? lastCallTime : 0)
            }
        }
        if (timerId === undefined) {
            timerId = setTimeout(timerExpired, wait)
        }
        return result
    }
    debounced.cancel = cancel
    debounced.flush = flush
    return debounced
}

function isObject(value: any): value is object {
    const type = typeof value
    return !!value && (type === 'object' || type === 'function')
}

function isObjectLike(value: any): value is object {
    return !!value && typeof value === 'object'
}

function isSymbol(value: any): value is symbol {
    return (
        typeof value === 'symbol' ||
        (isObjectLike(value) && objectToString.call(value) === symbolTag)
    )
}

function toNumber(value: any): number {
    if (typeof value === 'number') {
        return value
    }
    if (isSymbol(value)) {
        return NAN
    }
    if (isObject(value)) {
        const other =
            typeof value.valueOf === 'function' ? value.valueOf() : value
        value = isObject(other) ? other + '' : other
    }
    if (typeof value !== 'string') {
        return value === 0 ? value : +value
    }
    value = value.replace(reTrim, '')
    const isBinary = reIsBinary.test(value)
    return isBinary || reIsOctal.test(value)
        ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
        : reIsBadHex.test(value)
          ? NAN
          : +value
}
