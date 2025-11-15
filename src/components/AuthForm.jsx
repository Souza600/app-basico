import { useState } from 'react'
import { supabase } from '../utils/supabaseClient'

export default function AuthForm() {
  return (
    <div>
      <form>
        <input placeholder="E-mail" />
        <input placeholder="Senha" />
        <button>Entrar</button>
      </form>
    </div>
  )
}


