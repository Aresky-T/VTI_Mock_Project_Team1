import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react"
import { changeSettings } from "../redux/settings.slice";

export default function Settings() {
    const dispatch = useDispatch();
    const settings = useSelector(state => state.settings.settings);
    const themes = useSelector(state => state.settings.themes.themes);
    const primaryColors = useSelector(state => state.settings.primaryColors.primaryColors);
    const fontSizes = useSelector(state => state.settings.fontSizes.fontSizes);
    const animationSpeeds = useSelector(state => state.settings.animationSpeeds.animationSpeeds);

    const [theme, setTheme] = useState("light");
    const [primaryColor, setPrimaryColor] = useState(0);
    const [fontSize, setFontSize] = useState(1);
    const [animationSpeed, setAnimationSpeed] = useState(1);

    useEffect(() => {
        const root = document.documentElement
        for (let key in settings) {
            root.style.setProperty(key, settings[key]);
        }
    }, [settings])


    function changeThemeSystem(i) {
        const _theme = { ...themes[i] }
        setTheme(i === 0 ? "light" : "dark")
        let _settings = { ...settings }
        for (let key in _theme) {
            _settings[key] = _theme[key]
        }
        dispatch(changeSettings(_settings));
    }

    function changeColor(i) {
        const _color = primaryColors[i]
        let _settings = { ...settings }
        _settings["--primary-color"] = _color
        setPrimaryColor(i)
        dispatch(changeSettings(_settings));
    }

    function changeFontSize(i) {
        const _size = fontSizes[i]
        let _settings = { ...settings }
        _settings["--font-size"] = _size.value
        setFontSize(i)
        dispatch(changeSettings(_settings));
    }

    function changeAnimationSpeed(i) {
        const _speed = animationSpeeds[i]
        let _settings = { ...settings }
        _settings["--animation-speed"] = _speed.value
        setAnimationSpeed(i)
        dispatch(changeSettings(_settings));
    }

    return (
        <div className="settings-container">
            <div className="section d-block">
                <h2>Primary Theme</h2>
                <div className="options-container">
                    <div className="option light" onClick={() => changeThemeSystem(0)}>
                        {theme === "light" && (
                            <div className="check">
                                <FontAwesomeIcon icon={faCheck} />
                            </div>
                        )}
                    </div>
                    <div className="option dark" onClick={() => changeThemeSystem(1)}>
                        {theme === "dark" && (
                            <div className="check">
                                <FontAwesomeIcon icon={faCheck} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="section d-block">
                <h2>Preferred color</h2>
                <div className="options-container">
                    {primaryColors.map((color, index) => (
                        <div key={index} className="option light" style={{ backgroundColor: color }} onClick={() => changeColor(index)}>
                            {primaryColor === index && (
                                <div className="check">
                                    <FontAwesomeIcon icon={faCheck} />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className="section d-block">
                <h2>Font size</h2>
                <div className="options-container">
                    {fontSizes.map((size, index) => (
                        <button key={index} className="btn" onClick={() => changeFontSize(index)}>
                            {size.title}
                            {fontSize === index && <span><FontAwesomeIcon icon={faCheck} /></span>}
                        </button>
                    ))}
                </div>
            </div>
            <div className="section d-block">
                <h2>Animation speed</h2>
                <div className="options-container">
                    {animationSpeeds.map((speed, index) => (
                        <button key={index} className="btn" onClick={() => changeAnimationSpeed(index)}>
                            {speed.title}
                            {animationSpeed === index && <span><FontAwesomeIcon icon={faCheck} /></span>}
                        </button>
                    ))}
                </div>
            </div>

        </div>
    )
}