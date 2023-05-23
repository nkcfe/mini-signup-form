// TODO: 이 곳에 정답 코드를 작성해주세요.

// 1. 페이지가 로드 된 시점에 ID 입력 창에 Focus가 되어 있어야 합니다.
const $id = document.getElementById('id')
const $idMsg = document.getElementById('id-msg')

window.addEventListener('load', () => $id.focus())

// 2. 유효성 검사 로직
const $pw = document.getElementById('pw')
const $pwMsg = document.getElementById('pw-msg')
const $pwCheck = document.getElementById('pw-check')
const $pwCheckMsg = document.getElementById('pw-check-msg')

var ID_REGEX = new RegExp('^[a-z0-9_-]{5,20}$')
var PW_REGEX = new RegExp('^[a-zA-Z0-9]{8,16}$')

// 3.커스텀 에러 메세지
const ERROR_MSG = {
    required: '필수 정보입니다.',
    invalidId:
        '5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.',
    invalidPw: '8~16자 영문 대 소문자, 숫자를 사용하세요.',
    invalidPwCheck: '비밀번호가 일치하지 않습니다.',
}

const checkRegex = (target) => {
    // destructuring 구조분해할당
    // destructuring = const value = target.value; const id = target.id
    const { value, id } = target
    if (value.length === 0) {
        return 'required'
    } else {
        switch (id) {
            case 'id':
                return ID_REGEX.test(value) ? true : 'invalidId'
            case 'pw':
                return PW_REGEX.test(value) ? true : 'invalidPw'
            case 'pw-check':
                return value === $pw.value ? true : 'invalidPwCheck'
        }
    }
}

const checkValidation = (target, msgTarget) => {
    const isValid = checkRegex(target)
    if (isValid !== true) {
        target.classList.add('border-red-600')
        msgTarget.innerText = ERROR_MSG[isValid]
    } else {
        target.classList.remove('border-red-600')
        msgTarget.innerText = ''
    }
}

$id.addEventListener('focusout', () => checkValidation($id, $idMsg))
$pw.addEventListener('focusout', () => checkValidation($pw, $pwMsg))
$pwCheck.addEventListener('focusout', () =>
    checkValidation($pwCheck, $pwCheckMsg)
)

// 4.입력 확인 시 모달 창
const $modal = document.getElementById('modal') // modal
const $confirmId = document.getElementById('confirm-id') // 모달창에서 id
const $confirmPw = document.getElementById('confirm-pw') // 모달창에서 pw
const $submit = document.getElementById('submit')

// 3. 제출시 모든 유효성 검사하기
$submit.addEventListener('click', (e) => {
    e.preventDefault()

    const isValidForm =
        checkRegex($id, $idMsg) === true &&
        checkRegex($pw, $pwCheckMsg) === true &&
        checkRegex($pwCheck, $pwCheckMsg) === true
    if (isValidForm) {
        $confirmId.innerText = $id.value
        $confirmPw.innerText = $pw.value
        $modal.showModal()
    }
})

const $cancleBtn = document.getElementById('cancel-btn')
const $approveBtn = document.getElementById('approve-btn')

$cancleBtn.addEventListener('click', () => {
    $modal.close()
})

$approveBtn.addEventListener('click', () => {
    window.alert('가입되었습니다 🥳 ')
    $modal.close()
    window.location.reload()
})

// 5. 폰트 사이즈 조절
const $increaseFontBtn = document.getElementById('increase-font-btn')
const $decreaseFontBtn = document.getElementById('decrease-font-btn')

const $html = document.documentElement

const MAX_FONT_SIZE = 20
const MIN_FONT_SIZE = 12

const getHtmlFontSize = () => {
    return parseFloat(window.getComputedStyle($html).fontSize)
}

$increaseFontBtn.addEventListener('click', () => {
    onClickFontSizeControl('increase')
})

$decreaseFontBtn.addEventListener('click', () => {
    onClickFontSizeControl('decrease')
})

const onClickFontSizeControl = (flag) => {
    const fontSize = getHtmlFontSize()

    let newFontSize = flag === 'increase' ? fontSize + 1 : fontSize - 1

    $html.style.fontSize = newFontSize

    $decreaseFontBtn.disabled = newFontSize <= MIN_FONT_SIZE
    $increaseFontBtn.disabled = newFontSize >= MAX_FONT_SIZE
}
