import { useState, useEffect } from "react";

const useFetch = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bestMeditations, setBestMeditations] = useState([]);

  const meditationData = [
    {
      id: 1,
      title: "Mindful Breathing",
      shortDescription:
        "Focus on your breath and maintain a steady rhythm to clear your mind and reduce stress.",
      description: "Mindful breathing is a foundational meditation practice focused on calming the mind and reducing stress. It involves bringing full awareness to your breath, observing the inhale and exhale without judgment. By maintaining a steady rhythm of breathing, this practice helps soothe the nervous system. It enhances present-moment awareness and clears the mind of distractions. Over time, this method cultivates a sense of peace and inner balance. It's a highly accessible form of meditation suitable for beginners and advanced practitioners alike.",
      duration: "10 minutes",
      image: "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      target: "calmness",
      instructions: [
        "Sit comfortably with your back straight.",
        "Close your eyes and focus on your breathing.",
        "Inhale deeply and slowly through your nose.",
        "Exhale gently and fully through your mouth.",
        "Continue for 10 minutes, focusing solely on your breath."
      ]
    },
    {
      id: 2,
      title: "Body Scan Meditation",
      shortDescription:"Scan through each part of your body, relaxing your muscles and relieving tension",
      description: "Body scan meditation is a deeply relaxing practice that promotes body awareness and helps release accumulated tension. You progressively bring your attention to different parts of the body, starting from the feet and moving upward. This method is particularly effective for relieving muscle tightness and stress. As you scan each area, you may notice sensations, emotions, or the absence of sensation. The practice invites you to observe without trying to change anything. It fosters a deep connection between the mind and body, enhancing overall well-being.",
      duration: "15 minutes",
      image: "https://images.unsplash.com/photo-1573384666979-2b1e160d2d08?q=80&w=1878&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      target: "relaxation",
      instructions: [
        "Lie down on a comfortable surface.",
        "Close your eyes and take deep breaths.",
        "Start by focusing on your toes, tense and relax them.",
        "Move slowly upward, relaxing each muscle group as you go.",
        "Finish by focusing on your head and neck, releasing all remaining tension."
      ]
    },
    {
      id: 3,
      title: "Loving-Kindness Meditation",
      shortDescription:        "Send thoughts of love and kindness to yourself and others to foster positive emotions.",
      description: "Loving-kindness meditation (Metta) is a powerful way to open the heart and cultivate positive emotions. You generate feelings of compassion and unconditional love for yourself and others. The practice begins with directing kindness to yourself, then extends outward to loved ones, neutral people, and even those you find challenging. By mentally repeating phrases like 'May you be happy,' you can break down emotional barriers. Over time, it fosters emotional resilience and enhances your sense of connectedness to others. This meditation improves empathy and helps dissolve feelings of isolation or anger.",
      duration: "20 minutes",
      image: "https://images.unsplash.com/photo-1540206063137-4a88ca974d1a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      target: "compassion",
      instructions: [
        "Sit comfortably and close your eyes.",
        "Focus on feelings of love and kindness toward yourself.",
        "Extend these feelings toward loved ones, friends, and even strangers.",
        "Mentally repeat phrases such as 'May you be happy, may you be healthy'.",
        "Continue for 20 minutes, expanding your circle of compassion."
      ]
    },
    {
      id: 4,
      title: "Guided Visualization",
      shortDescription:'Visualize a peaceful scene to calm your mind and enhance focus.',
      description: "Guided visualization meditation helps reduce stress and achieve mental clarity by immersing your mind in calming scenes. You engage your imagination to picture a serene environment, such as a quiet beach or a lush forest. Using all your senses, you experience the sights, sounds, and sensations of this peaceful place. The practice brings a deep sense of relaxation, making it easier to manage stress and anxiety. Visualization also enhances focus and creativity, as you fully immerse yourself in the mental imagery. It's a useful technique for unwinding after a long day.",
      duration: "12 minutes",
      image: "https://plus.unsplash.com/premium_photo-1713908832384-55726490c8e2?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      target: "mental clarity",
      instructions: [
        "Find a quiet place and sit comfortably.",
        "Close your eyes and begin by visualizing a peaceful scene, like a beach or forest.",
        "Engage all of your senses in the visualization.",
        "Focus on this image for 12 minutes to clear your mind.",
        "Slowly bring your attention back to the present when finished."
      ]
    },
    {
      id: 5,
      title: "Mantra Meditation",
      shortDescription:"Repeat a calming word or phrase to quiet the mind and center yourself.",
      description: "Mantra meditation is a powerful way to quiet the mind and achieve a state of inner peace. By repeating a calming word or phrase, you create a point of focus that helps to override scattered thoughts. The sound and vibration of the mantra anchor your awareness, making it easier to remain present. This form of meditation is known to relieve stress and promote mental clarity. The mantra can be said silently or aloud, depending on your preference. Over time, this practice can deepen your sense of self-awareness and connection.",
      duration: "10 minutes",
      image: "https://images.unsplash.com/photo-1547852355-26c780c450f9?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      target: "inner peace",
      instructions: [
        "Choose a mantra such as 'Om' or 'peace'.",
        "Sit in a comfortable position with your eyes closed.",
        "Inhale deeply and on the exhale, repeat your mantra aloud or silently.",
        "Focus on the sound and vibration of the mantra.",
        "Continue for 10 minutes, letting the mantra guide your meditation."
      ]
    },
    {
      id: 6,
      title: "Chakra Meditation",
      shortDescription:'Focus on aligning your energy centers to achieve balance and peace.',
      description: "Chakra meditation is designed to balance the body's seven energy centers, promoting harmony and overall well-being. The practice involves visualizing a glowing light in each chakra, from the root to the crown. By focusing on these energy points, you can release blockages and revitalize your entire system. Each chakra corresponds to specific physical, emotional, and spiritual aspects. As you engage in this meditation, you may experience a sense of grounding, creativity, or higher consciousness. It's a transformative method for those seeking a holistic approach to self-care.",
      duration: "25 minutes",
      image: "https://images.unsplash.com/photo-1573590330099-d6c7355ec595?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      target: "energy balance",
      instructions: [
        "Sit in a quiet place and close your eyes.",
        "Visualize each chakra, starting from the root (base of the spine) and moving upward.",
        "Imagine a glowing light in each chakra, energizing it as you breathe in.",
        "With each exhale, visualize the chakra's light expanding.",
        "Continue focusing on all seven chakras for 25 minutes."
      ]
    },
    {
      id: 7,
      title: "Walking Meditation",
      shortDescription:'Combine walking with mindfulness to bring awareness to your movement and surroundings.',
      description: "Walking meditation is a form of mindfulness practice that combines physical movement with awareness. It invites you to focus on your steps, the sensations in your body, and your surroundings. This practice is especially beneficial for those who find seated meditation challenging. By paying attention to each step, you create a sense of balance between body and mind. Walking meditation can be done indoors or outdoors, making it adaptable to different environments. It enhances concentration and helps you stay grounded, even in stressful situations. Regular practice promotes a deeper connection to the present moment.",
      duration: "15 minutes",
      image: "https://images.unsplash.com/photo-1573646985533-85d8a384e020?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      target: "mind-body balance",
      instructions: [
        "Choose a path where you can walk undisturbed.",
        "Walk slowly, paying attention to each step.",
        "Feel the ground under your feet and notice how your body moves.",
        "Focus on your breathing, aligning it with your steps.",
        "Continue walking for 15 minutes, staying fully present."
      ]
    },
    {
      id: 8,
      title: "Zen Meditation (Zazen)",
      shortDescription:'Practice sitting meditation to develop concentration and insight',
      description: "Zen meditation, or Zazen, is a form of seated meditation originating from Zen Buddhism. It emphasizes observing your thoughts without attachment or judgment. The practice typically involves sitting in the lotus or half-lotus position, with hands in a specific mudra. You keep your gaze slightly downward, either with eyes open or closed. Zazen focuses on cultivating mindfulness and insight, ultimately leading to a sense of inner stillness. Regular practice helps reduce mental clutter and brings about a deeper understanding of your true nature. It's an ideal meditation for self-reflection and developing inner wisdom.",
      duration: "30 minutes",
      image: "https://images.unsplash.com/photo-1611800065908-233b597db552?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      target: "self-reflection",
      instructions: [
        "Sit in the lotus or half-lotus position, keeping your back straight.",
        "Place your hands on your lap in a Zen mudra.",
        "Gaze slightly downward or close your eyes.",
        "Observe your thoughts as they arise and let them pass without attachment.",
        "Continue for 30 minutes, cultivating stillness and awareness."
      ]
    },
    {
      id: 9,
      title: "Gratitude Meditation",
      shortDescription:'Use a specific mantra to transcend ordinary thinking and reach a deep state of relaxation.',
      description: "Gratitude meditation focuses on fostering a sense of thankfulness and appreciation for the present moment. You reflect on things you are grateful for, both big and small, such as loved ones, your health, or simple pleasures. This meditation is known to uplift the spirit, increase happiness, and improve overall well-being. By taking time to express gratitude, you shift your mindset from lack to abundance. It helps reduce stress and fosters a more positive outlook on life. Practicing regularly can also deepen your relationships and enhance your sense of life satisfaction.",
      duration: "10 minutes",
      image: "https://images.unsplash.com/photo-1489908990827-08a75c580832?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      target: "happiness",
      instructions: [
        "Sit in a comfortable position with your hands on your heart.",
        "Close your eyes and take a few deep breaths.",
        "Reflect on three things you are grateful for, visualizing each one vividly.",
        "Feel the warmth of gratitude spreading throughout your body.",
        "Continue for 10 minutes, immersing yourself in feelings of thankfulness."
      ]
    },
    {
      id: 10,
      title: "Vipassana Meditation",
      shortDescription:"Tense and relax muscle groups progressively to reduce physical tension.",
      description: "Vipassana is a traditional meditation technique aimed at developing insight through self-observation. You focus on the impermanence of bodily sensations, observing how they arise and pass. This practice helps in gaining a deep understanding of the mind-body connection. It encourages you to remain equanimous and non-reactive, even to intense sensations. The continuous awareness brings about profound inner transformation, reducing suffering and increasing mental clarity. Vipassana is often taught in silent retreats and requires dedication and discipline. It's a powerful way to cultivate mindfulness and a balanced perspective on life.",
      duration: "60 minutes",
      image: "https://images.unsplash.com/photo-1526724038726-3007ffb8025f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      target: "self-awareness",
      instructions: [
        "Sit quietly with your eyes closed and take a few deep breaths.",
        "Focus on the sensations of your body, starting from the top of your head.",
        "Observe each sensation without judgment, moving slowly down your body.",
        "If you notice a reaction, observe it and return to the body scan.",
        "Practice for 60 minutes, developing equanimity and awareness."
      ]
    }
  ];
  const BestMeditations = [
    {
      id: 11,
      title: "Mindful Breathing",
      description: "Mindful breathing focuses on your natural breath, helping to clear your mind and alleviate stress. By maintaining a steady rhythm, you become fully present, tuning in to the sensations of each inhale and exhale. This meditation cultivates a calm and centered state, improving focus and relaxation. It’s an excellent practice to ground yourself during a busy day. The simplicity of focusing on the breath makes it accessible to anyone, regardless of experience. Regular practice enhances overall well-being and mental clarity, helping to navigate life's challenges with ease.",
      duration: "10 minutes",
      image: "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?q=80&w=1926&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      target: "calmness",
      instructions: ["Sit comfortably with your back straight.", "Close your eyes and focus on your breathing.", "Inhale deeply and slowly through your nose.", "Exhale gently and fully through your mouth.", "Continue for 10 minutes, focusing solely on your breath."]
    },
    {
      id: 12,
      title: "Body Scan Meditation",
      description: "Body scan meditation guides you to relax your muscles systematically from head to toe. As you move through each part of your body, you observe sensations without judgment. This technique releases physical tension, promoting deep relaxation and body awareness. It's a great way to de-stress and improve your connection to your physical self. Regular practice can also aid in better sleep and stress management. By mindfully relaxing your muscles, you reduce the buildup of anxiety and create a sense of peace throughout your entire being.",
      duration: "15 minutes",
      image: "https://images.unsplash.com/photo-1518458717367-249ba15389d2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      target: "relaxation",
      instructions: ["Lie down on a comfortable surface.", "Close your eyes and take deep breaths.", "Start by focusing on your toes, tense and relax them.", "Move slowly upward, relaxing each muscle group as you go.", "Finish by focusing on your head and neck, releasing all remaining tension."]
    },
    {
      id: 13,
      title: "Loving-Kindness Meditation",
      description: "Loving-kindness meditation helps cultivate compassion and kindness towards yourself and others. You start by focusing on generating warm feelings of love for yourself. Gradually, you extend these feelings to loved ones, acquaintances, and even those you may have conflicts with. This practice fosters a positive outlook, enhances emotional well-being, and deepens empathy. It can improve relationships and increase overall happiness. Sending out wishes for others’ happiness and health helps build a mindset of generosity and connection. It’s a transformative meditation for inner and outer harmony.",
      duration: "20 minutes",
      image: "https://images.unsplash.com/photo-1447452001602-7090c7ab2db3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      target: "compassion",
      instructions: ["Sit comfortably and close your eyes.", "Focus on feelings of love and kindness toward yourself.", "Extend these feelings toward loved ones, friends, and even strangers.", "Mentally repeat phrases such as 'May you be happy, may you be healthy'.", "Continue for 20 minutes, expanding your circle of compassion."]
    },
    {
      id: 14,
      title: "Guided Visualization",
      description: "Guided visualization uses your imagination to transport you to a calming environment, like a beach or forest. It engages your senses, bringing a sense of peace and mental clarity. By vividly imagining the sights, sounds, and sensations of this serene scene, your mind begins to relax. This method helps reduce stress and improve focus, making it a useful tool for busy or anxious times. Visualization can also be a powerful way to set intentions or achieve goals. It’s an accessible and effective technique for deep relaxation and positive thinking.",
      duration: "12 minutes",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1999&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      target: "mental clarity",
      instructions: ["Find a quiet place and sit comfortably.", "Close your eyes and begin by visualizing a peaceful scene, like a beach or forest.", "Engage all of your senses in the visualization: feel the warmth of the sun, hear the waves, etc.", "Focus on this image for 12 minutes to clear your mind.", "Slowly bring your attention back to the present when finished."]
    },
    {
      id: 15,
      title: "Mantra Meditation",
      description: "Mantra meditation uses the repetition of a calming word or phrase to quiet the mind and enhance concentration. The sound and vibration of the mantra help you stay centered and present. This practice cultivates inner peace and can reduce mental distractions. It’s a versatile technique suitable for anyone seeking to deepen their meditation practice. Using a mantra can also help anchor your mind when thoughts or emotions feel overwhelming. Over time, it leads to a greater sense of clarity and spiritual connection, enhancing your overall well-being.",
      duration: "10 minutes",
      image: "https://images.unsplash.com/photo-1575052814074-c05122e0a17a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      target: "inner peace",
      instructions: ["Choose a mantra such as 'Om' or 'peace'.", "Sit in a comfortable position with your eyes closed.", "Inhale deeply and on the exhale, repeat your mantra aloud or silently.", "Focus on the sound and vibration of the mantra.", "Continue for 10 minutes, letting the mantra guide your meditation."]
    },
    {
      id: 16,
      title: "Chakra Meditation",
      description: "Chakra meditation focuses on balancing and energizing your body's energy centers. You work on visualizing each of the seven chakras, from the root to the crown, imagining vibrant, healing light. This practice helps remove energy blockages and promotes overall well-being. As you align your chakras, you may feel more balanced, calm, and in tune with your true self. It's a spiritual and therapeutic method to improve mental, emotional, and physical health. Over time, chakra meditation enhances self-awareness and the flow of energy throughout the body.",
      duration: "25 minutes",
      image: "https://images.unsplash.com/photo-1522898467493-49726bf28798?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      target: "energy balance",
      instructions: ["Sit in a quiet place and close your eyes.", "Visualize each chakra, starting from the root (base of the spine) and moving upward.", "Imagine a glowing light in each chakra, energizing it as you breathe in.", "With each exhale, visualize the chakra's light expanding.", "Continue focusing on all seven chakras for 25 minutes."]
    },
    {
      id: 17,
      title: "Walking Meditation",
      description: "Walking meditation combines movement with mindfulness, bringing awareness to every step. You pay attention to your body's sensations, the rhythm of your walking, and your surroundings. This practice helps connect the mind and body, grounding you in the present moment. It can also relieve stress and improve focus, making it an excellent break during a busy day. By aligning your breath with your steps, you cultivate a calming rhythm. Walking meditation is particularly helpful for those who find it difficult to sit still for traditional meditation.",
      duration: "15 minutes",
      image: "https://images.unsplash.com/photo-1536922246289-88c42f957773?q=80&w=1808&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      target: "mind-body connection",
      instructions: ["Find a peaceful location where you can walk undisturbed.", "Walk slowly, focusing on each step you take.", "Notice how your feet feel as they touch the ground.", "Synchronize your breathing with your steps, inhaling for a few steps and exhaling for a few.", "Continue for 15 minutes, staying aware of your body and the present moment."]
    }
    
  ];

  const fetchData = () => {
    setIsLoading(true);
    try {
      // Simulate API delay
      setTimeout(() => {
        // Combine both arrays into one
        setData(meditationData);
        setBestMeditations(BestMeditations);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      setError("Failed to fetch data");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  const getItemById = (id) => {
    const item =
      meditationData.find((meditation) => meditation.id === id) ||
      BestMeditations.find((meditation) => meditation.id === id);
    return item || null;
  };

  return { data, isLoading, error, refetch, getItemById, bestMeditations };
};

export default useFetch;
