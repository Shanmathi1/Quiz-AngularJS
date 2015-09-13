(function(){

	var app = angular.module('myQuiz',[]);

	app.controller('QuizController',['$scope','$http','$sce',function($scope,$http,$sce){

		$scope.score = 0;
		$scope.activeQuestion = -1;
		$scope.activeQuestionAnswered = 0;
		$scope.percentage = 0;

		$http.get('quiz_data.json').then(function(quizData){
			$scope.myQuestions = quizData.data;
			$scope.totalQuestions = $scope.myQuestions.length;
		});

		$scope.selectAnswer = function(qIndex,aIndex){

			var questionState = $scope.myQuestions[qIndex].questionState;

			if( questionState != 'answered' ){
				$scope.myQuestions[qIndex].selectedAnswer = aIndex;
				var correctAnswer = $scope.myQuestions[qIndex].correct;
				$scope.myQuestions[qIndex].correctAnswer = correctAnswer;

				if( aIndex === correctAnswer ){
					$scope.myQuestions[qIndex].correctness = 'correct';
					$scope.score += 1;
				}else{
					$scope.myQuestions[qIndex].correctness = 'incorrect';
				}
				$scope.myQuestions[qIndex].questionState = 'answered';
			}
			$scope.percentage = (($scope.score / $scope.totalQuestions) * 100);
		}

		$scope.isSelected = function(qIndex,aIndex){
			return $scope.myQuestions[qIndex].selectedAnswer === aIndex;
		}

		$scope.isCorrect = function(qIndex,aIndex){
			return $scope.myQuestions[qIndex].correctAnswer === aIndex;
		}

		$scope.selectContinue = function(){
			return $scope.activeQuestion += 1;
		}

		$scope.createShareLinks = function(percentage){

			var emailLink = '<a  class= "btn email" href="mailto:?subject=Try to beat my quiz score!&amp;body=I scored a '+percentage+'% on this quiz about Saturn. Try to beat my score">Email a friend</a>';
			var twitterLink = '<a class= "btn twitter" target = "_blank" href="https://twitter.com/intent/tweet?text=I%20just%20scored%20a%20'+percentage+'%20percentage%20on%20this%20quiz!%20Try%20to%20beat%20my%20score!%20">Tweet your score</a>';
			var newMarkup = emailLink + twitterLink;
			return $sce.trustAsHtml(newMarkup);

		}


	}]);

})();
