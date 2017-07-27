pipeline {
  agent any
  stages {
    stage('Message') {
      steps {
        parallel(
          "Message": {
            echo 'hello world'
            echo 'ok'
            
          },
          "": {
            echo 'otro'
            
          }
        )
      }
    }
    stage('') {
      steps {
        echo 'yea'
      }
    }
  }
}