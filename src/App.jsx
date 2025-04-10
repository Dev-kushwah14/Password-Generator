import { useState, useCallback, useEffect,useRef } from 'react'



function App() {
  const [lenght, setLenght] = useState(6)
  const [uppercase, setUppercase] = useState(false)
  const [number, setNumber] = useState(false)
  const [character, setCharacter] = useState(false)
  const [generat, setGenerat] = useState(false)
  const [password, setPassword] = useState("")
  const passwordRef = useRef(null)

  let passwordgenerator = useCallback(() => {
    let char = "abcdefghijklmnopqrstuvwxyz"
    if (uppercase) char += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (number) char += "0123456789"
    if (character) char += "!@#$%^&*()_+"
    let pass = ""
    for (let i = 0; i < lenght; i++) {
      const random = Math.floor(Math.random() * char.length + 1)
      pass += char.charAt(random)
    }
    setPassword(pass)

  }, [generat, lenght, uppercase, number, character, setPassword])

const copyPassword = useCallback(()=>{
  window.navigator.clipboard.writeText(password)
  passwordRef.current.select()
})

  useEffect(() => {
    passwordgenerator()
  }, [generat])


  return (
    <>
      <div className='text-white bg-gray-600 w-full max-w-md mx-auto my-20 px-5 py-5 shadow-2xl rounded-lg' 
     >
        <h2 className=' text-2xl text-center '>Password Generator</h2>
        <div className=' mb-4 flex shadow-lg overflow-hidden my-3 rounded-lg'>
          <input 
          ref={passwordRef}
          type="text" 
          readOnly
          value={password}
          className='w-full text-black bg-white px-1 py-1' />

          <button 
          onClick={copyPassword}
          className='bg-blue-800 px-2 py-1 cursor-pointer hover:bg-blue-900'>Copy</button>
        </div>
        <div className='flex gap-2  flex-col '>
          <div className='flex gap-2 items-center '>
            <input
              type="range"
              min={6}
              max={16}
              value={lenght}
              onChange={(e) => setLenght(e.target.value)}
            />
            <label>Langht {lenght}</label>
          </div>
          <div className='flex gap-3 items-center '>
            <input 
            type="checkbox" 
            defaultChecked={setUppercase} 
            onChange={() => { setUppercase((prev) => !prev); }} />
            <label>Include Uppercase</label>
          </div>

          <div className='flex gap-2 items-center '>
            <input 
            type="checkbox" 
            defaultChecked={setNumber} 
            onChange={() => { setNumber((prev) => !prev); }} />
            <label>Include Number</label>
          </div>

          <div className='flex gap-2 items-center '>
            <input 
            type="checkbox" 
            defaultChecked={setCharacter} 
            onChange={() => { setCharacter((prev) => !prev); }} />
            <label>Include Character</label>
          </div>
        </div>

        <div className='flex justify-center my-3'>
          <button
            className='bg-green-600 px-5 py-2 text-xl cursor-pointer hover:bg-green-700 outline-none shadow-lg rounded-lg'
            onClick={() => setGenerat(!generat)}
          >Generat</button>
        </div>

      </div>

    </>
  )
}

export default App
