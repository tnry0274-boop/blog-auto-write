const aiTopicInput = document.getElementById('ai-topic');
const aiGenerateBtn = document.getElementById('ai-generate-btn');
const resultSection = document.getElementById('result-section');
const titleOutput = document.getElementById('title-output');
const contentOutput = document.getElementById('content-output');
const tagsOutput = document.getElementById('tags-output');
const resetBtn = document.getElementById('reset-btn');

// AI Templates
const templates = {
  '여행': {
    title: '나만 알고 싶은 숨은 여행지 베스트 3: 힐링이 필요한 당신에게',
    content: '복잡한 도시의 소음에서 벗어나 진정한 휴식을 취할 수 있는 곳을 찾고 계신가요? 이번 포스팅에서는 잘 알려지지 않았지만 보석 같은 국내 여행지 3곳을 소개해 드립니다.\n\n1. 제주도의 숨겨진 오름\n관광객으로 북적이는 유명 명소 대신, 조용히 제주의 자연을 만끽할 수 있는 작은 오름들을 추천합니다. 새벽 안개 속의 오름은 마치 다른 세상에 온 것 같은 착각을 불러일으킵니다.\n\n2. 강원도의 조용한 해변 마을\n서핑으로 유명한 곳들 사이로, 현지인들만 아는 작은 포구가 있습니다. 파도 소리만 들리는 조용한 카페에서 마시는 커피 한 잔은 일상의 스트레스를 모두 날려줄 것입니다.\n\n3. 남해의 보석 같은 섬들\n남해안의 작은 섬들은 에메랄드빛 바다와 정겨운 마을 풍경을 간직하고 있습니다. 걷기만 해도 마음이 정화되는 둘레길을 따라 걸어보세요.\n\n이번 주말, 일상에서 잠시 벗어나 새로운 공기를 마셔보는 건 어떨까요? 여러분의 지친 마음을 달래줄 완벽한 여행이 될 것입니다.',
    tags: '#여행 #국내여행 #힐링여행 #숨은명소 #주말나들이'
  },
  '인공지능': {
    title: 'AI가 바꾸는 우리의 미래 일상: 2026년 변화의 중심에서',
    content: '인공지능 기술은 이제 상상을 넘어 우리 삶의 깊숙한 곳까지 들어와 있습니다. 불과 몇 년 전만 해도 SF 영화의 소재였던 기술들이 이제는 스마트폰 속 앱 하나로 실현되고 있죠.\n\n업무의 효율성을 높여주는 AI 툴부터, 개인 맞춤형 건강 관리 비서까지. 기술의 발전이 가져올 편리함은 무궁무진합니다.\n\n하지만 우리가 주의해야 할 점도 있습니다. 데이터의 투명성, 기술에 대한 의존도 조절 등 인간으로서 중심을 잃지 않는 자세가 더욱 중요해지는 시점입니다.\n\n이번 포스팅에서는 현재 가장 주목받는 AI 트렌드와 이것이 우리의 직업관, 그리고 여가 시간에 미칠 영향에 대해 심도 있게 다뤄보겠습니다.',
    tags: '#인공지능 #AI #미래기술 #테크트렌드 #혁신'
  },
  '요리': {
    title: '주말 저녁을 특별하게 만드는 15분 레시피: 집에서 즐기는 파인 다이닝',
    content: '바쁜 일상 속에서도 건강하고 맛있는 한 끼를 포기할 수 없죠. 거창한 재료가 없어도 괜찮습니다. 냉장고 속 기본 재료만으로도 충분히 근사한 요리를 만들 수 있으니까요.\n\n이번에 소개할 레시피는 준비부터 완성까지 단 15분이면 충분한 "원팬 파스타"와 "특제 샐러드 드레싱"입니다.\n\n신선한 올리브유와 마늘의 풍미를 극대화하는 조리법부터, 플레이팅 하나로 분위기를 바꾸는 팁까지 모두 공개합니다. 오늘 저녁, 소중한 사람과 함께 직접 만든 요리로 특별한 시간을 보내보는 건 어떨까요?',
    tags: '#요리 #레시피 #집밥 #원팬요리 #미식 #홈쿡'
  },
  'default': {
    title: (topic) => `${topic}에 대한 새로운 통찰과 완벽 가이드`,
    content: (topic) => `${topic}은(는) 현대 사회에서 우리가 주목해야 할 매우 흥미롭고 중요한 주제입니다.\n\n이 주제를 깊이 탐구해보면 예상치 못한 즐거움과 지식을 발견할 수 있습니다. 많은 사람들이 ${topic}에 대해 궁금해하지만, 어디서부터 시작해야 할지 모르는 경우가 많습니다.\n\n본 포스팅에서는 ${topic}의 핵심 원리부터 실생활 적용 방법, 그리고 앞으로의 전망까지 초보자도 이해하기 쉽게 핵심만 요약하여 정리해 드립니다. 지금 바로 확인해 보세요!`,
    tags: (topic) => `#${topic} #정보공유 #가이드 #새로운발견 #팁`
  }
};

async function generateAIContent() {
  const topic = aiTopicInput.value.trim();
  if (!topic) {
    alert('어떤 주제로 블로그를 쓸지 입력해주세요!');
    return;
  }

  aiGenerateBtn.classList.add('loading');
  const originalContent = aiGenerateBtn.innerHTML;
  aiGenerateBtn.innerHTML = '⌛ 작성 중...';
  aiGenerateBtn.disabled = true;

  // Simulate AI delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  let generated;
  if (templates[topic]) {
    generated = templates[topic];
  } else {
    generated = {
      title: templates.default.title(topic),
      content: templates.default.content(topic),
      tags: templates.default.tags(topic)
    };
  }

  // Display results
  titleOutput.textContent = generated.title;
  contentOutput.textContent = generated.content;
  tagsOutput.textContent = generated.tags;

  // Show result section
  resultSection.classList.remove('hidden');
  resultSection.scrollIntoView({ behavior: 'smooth' });

  // Reset button
  aiGenerateBtn.classList.remove('loading');
  aiGenerateBtn.innerHTML = originalContent;
  aiGenerateBtn.disabled = false;
}

// Copy to Clipboard logic
function copyToClipboard(elementId, button) {
  const text = document.getElementById(elementId).textContent;
  navigator.clipboard.writeText(text).then(() => {
    const originalText = button.textContent;
    button.textContent = '복사 완료!';
    button.classList.add('success');
    
    setTimeout(() => {
      button.textContent = originalText;
      button.classList.remove('success');
    }, 2000);
  }).catch(err => {
    console.error('복사 실패:', err);
  });
}

// Event Listeners
aiGenerateBtn.addEventListener('click', generateAIContent);

resetBtn.addEventListener('click', () => {
  resultSection.classList.add('hidden');
  aiTopicInput.value = '';
  aiTopicInput.focus();
});

document.querySelectorAll('.copy-btn').forEach(button => {
  button.addEventListener('click', () => {
    const targetId = button.getAttribute('data-target');
    copyToClipboard(targetId, button);
  });
});

// Allow Enter key to trigger generation
aiTopicInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    generateAIContent();
  }
});
