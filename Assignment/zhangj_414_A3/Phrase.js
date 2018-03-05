function validatePhaseInput(){
  var val = document.phraseForm.phrase.value;
  var rule = /^[0-9a-zA-Z]+[0-9a-zA-Z\s]+[0-9a-zA-Z]$/;
  if(val.match(rule)){
    return true;
  }else{
    alert("Please input alphanumeric characters (0-9,a-z,A-Z,space). Space can't be start or end.");
    return false;
  }
}
