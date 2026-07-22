function TsxRules() {
  return (
    <div>
      <input type="text" id =" username" name="username" autoComplete="username"/>
      {/*Input tags must be self-closing in TSX.*/}
      <p className="highlight">Styled paragraph</p>
      {/* className should be used instead of class beacuse class is a Javascript keyword */}
      <label htmlFor="email" >Email</label>
      {/* htmlFor is used instead of for */}
      <input id="email" type="email" name="email" autoComplete="email"/>
      {/* Input tags must be self-closing in TSX */}
      <p style={{color: 'red', fontSize: '16px'}}>Red text</p>
      {/* Style must be a javascript object, not a string */}
      
      {/* This is a comment */}
    </div>
  )
}

export default TsxRules