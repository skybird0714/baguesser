document.addEventListener('DOMContentLoaded', () => {
  // 直接在JS中设置配置，不再使用外部JSON
  const config = {
    progress: 25,
    timeNodes: {
      "0": "",
      "25": "5月18日",
      "50": "6月",
      "75": "未知",
      "100": "未知"
    },
    announcement: "MCguesser现已上线，立即体验：https://mcguesser.071400.xyz/" // 这里可以修改公告内容
  };

  setTimeout(() => {
    try {
      // 获取DOM元素
      const progressFill = document.querySelector('.progress-fill');
      const milestones = document.querySelectorAll('.milestone');
      const announcementContent = document.querySelector('.announcement-content');
      
      // 设置公告内容
      if (announcementContent && config.announcement) {
        announcementContent.textContent = config.announcement;
      }
      
      // 显示时间节点
      Object.keys(config.timeNodes).forEach(percent => {
        const timeNode = document.querySelector(`.milestone[data-percent="${percent}"] .milestone-time`);
        if (timeNode) {
          timeNode.textContent = config.timeNodes[percent];
        }
      });
      
      // 确保进度条初始值为0
      progressFill.style.width = '0%';
      
      // 手动强制触发重排
      void progressFill.offsetWidth;
      
      // 设置进度值
      const progressValue = config.progress;
      
      // 延迟更新进度条以确保动画效果
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          // 应用进度条动画
          progressFill.style.width = `${progressValue}%`;
          
          // 激活已达到的里程碑
          milestones.forEach(milestone => {
            const percentValue = parseInt(milestone.getAttribute('data-percent'));
            if (percentValue <= progressValue) {
              milestone.classList.add('active');
            }
          });
        });
      });
      
    } catch (error) {
      console.error('初始化进度条失败:', error);
    }
  }, 100); // 给页面渲染一些时间
}); 
