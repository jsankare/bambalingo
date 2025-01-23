import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { Navigation } from './components/Navigation'
import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'
import { LexiconPage } from "./pages/LexiconPage"
import { TrainingPage } from "./pages/Training.tsx";

const GlobalStyle = createGlobalStyle`
    body {
        width: 100%;
    }
    #root {
        width: 100%;
        padding-top: 4rem;
        min-height: 100vh;
    }
`

function App() {
    return (
        <BrowserRouter>
            <GlobalStyle />
            <Navigation />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/training" element={<TrainingPage />} />
                <Route path="/lexicon" element={<LexiconPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App